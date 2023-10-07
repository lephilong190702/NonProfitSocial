package com.csn.charity.service.implement;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.csn.charity.model.Project;
import com.csn.charity.model.ProjectImage;
import com.csn.charity.repository.ProjectImageRepository;
import com.csn.charity.repository.ProjectRepository;
import com.csn.charity.service.interfaces.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private ProjectImageRepository projectImageRepository;

    @Override
    public List<Project> getAll() {
        return this.projectRepository.findAll();
    }

    @Override
    public Project add(Project project) {
        if (project.getFiles() != null && !project.getFiles().isEmpty()) {
            List<ProjectImage> images = new ArrayList<>();
            try {
                project.getFiles().forEach(file -> {
                    if (!file.isEmpty()) {
                        try {
                            Map res = this.cloudinary.uploader().upload(file.getBytes(),
                                    ObjectUtils.asMap("resource_type", "auto"));

                            String imageUrl = res.get("secure_url").toString();
                            System.out.println("Image URL: " + imageUrl);
                            ProjectImage img = new ProjectImage();
                            img.setImage(imageUrl);
                            img.setProject(project);
                            projectRepository.save(project);
                            images.add(img);
                            projectImageRepository.save(img);
                        } catch (IOException ex) {
                            Logger.getLogger(ProjectServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    }
                });
                project.setImages(images);
                project.setContributedAmount(new BigDecimal(0));
                project.setStatus(true);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return this.projectRepository.save(project);
    }

    @Override
    public Project update(Long id, Project project) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));

        p.setCategory(project.getCategory());
        p.setTitle(project.getTitle());
        p.setAddress(project.getAddress());
        p.setContent(project.getContent());
        p.setStartDate(project.getStartDate());
        p.setEndDate(project.getEndDate());
        p.setTotalAmount(project.getTotalAmount());
        if (project.getFiles() != null && !project.getFiles().isEmpty()) {
            List<ProjectImage> images = new ArrayList<>();
            try {
                project.getFiles().forEach(file -> {
                    if (!file.isEmpty()) {
                        try {
                            Map res = this.cloudinary.uploader().upload(file.getBytes(),
                                    ObjectUtils.asMap("resource_type", "auto"));

                            String imageUrl = res.get("secure_url").toString();
                            System.out.println("Image URL: " + imageUrl);
                            ProjectImage img = new ProjectImage();
                            img.setImage(imageUrl);
                            img.setProject(p);
                            projectRepository.save(project);
                            images.add(img);
                            projectImageRepository.save(img);
                        } catch (IOException ex) {
                            Logger.getLogger(ProjectServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    }
                });
                p.setImages(images);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return this.projectRepository.save(p);
    }

    @Override
    public void delete(Long id) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));
        projectRepository.delete(p);
    }

    @Override
    public Project get(Long id) {
        return this.projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));
    }

    @Override
    public List<Project> findByName(String name) {
        return this.projectRepository.findByName(name);
    }

    @Override
    public Long countProjectByCategory(Long categoryId) {
        return this.projectRepository.countProjectsByCategoryId(categoryId);
    }

}
