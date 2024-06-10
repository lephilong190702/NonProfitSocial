package com.csn.charity.service.implement;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.csn.charity.dto.ProjectDTO;
import com.csn.charity.model.Project;
import com.csn.charity.model.ProjectCategory;
import com.csn.charity.model.ProjectImage;
import com.csn.charity.model.User;
import com.csn.charity.repository.ProjectCategoryRepository;
import com.csn.charity.repository.ProjectImageRepository;
import com.csn.charity.repository.ProjectRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.MailService;
import com.csn.charity.service.interfaces.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private ProjectImageRepository projectImageRepository;
    @Autowired
    private ProjectCategoryRepository projectCategoryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailService mailService;

    @Override
    public List<Project> getAll() {
        return this.projectRepository.findByPending(false);
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
                project.setDateSend(new Date());
                project.setPending(false);
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
        p.setContributedAmount(project.getContributedAmount());
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

    @Override
    // @Cacheable(value = "projectByCategory", key = "#categoryId")
    public List<Project> getProjectsByCategory(Long categoryId) {
        ProjectCategory projectCategory = this.projectCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy danh mục với ID: " + categoryId));
        return this.projectRepository.findByCategory(projectCategory);
    }

    @Override
    public List<Project> search(String kw) {
        return projectRepository.search(kw);
    }

    @Override
    // @Cacheable(value = "projectImages", key = "#id")
    public List<ProjectImage> getImagesByProject(Long id) {
        Project project = this.projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));
        return this.projectImageRepository.findByProject(project);
    }

    @Override
    public Project sendProject(ProjectDTO projectDTO, List<MultipartFile> files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Không đủ quyền truy cập!!!");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng!!");
        }

        Project project = new Project();
        project.setTitle(projectDTO.getTitle());
        project.setContent(projectDTO.getContent());
        project.setAddress(projectDTO.getAddress());
        project.setTotalAmount(projectDTO.getTotalAmount());
        project.setStartDate(projectDTO.getStartDate());
        project.setEndDate(projectDTO.getEndDate());

        if (files != null && !files.isEmpty()) {
            List<ProjectImage> images = new ArrayList<>();
            try {
                for (MultipartFile file : files) {
                    if (!file.isEmpty()) {
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
                    }
                }
                project.setImages(images);
                project.setStatus(true);
                project.setUser(user);
                project.setPending(true);
                project.setDateSend(new Date());
            } catch (IOException ex) {
                Logger.getLogger(ProjectServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return projectRepository.save(project);
    }

    @Override
    public List<Project> getPendingProject() {
        return projectRepository.findByPending(true);
    }

    @Override
    public void acceptProject(Long projectId) {
        Project project = this.projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + projectId));
        project.setPending(false);
        this.projectRepository.save(project);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }
        if (user.getEmail() != null)
            mailService.sendUploadProjectEmail(user.getEmail());
    }

    @Override
    public void denyProject(Long projectId) {
        Project project = this.projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + projectId));
        this.projectRepository.delete(project);
    }

}
