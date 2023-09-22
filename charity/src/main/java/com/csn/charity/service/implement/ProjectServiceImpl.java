package com.csn.charity.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.model.Project;
import com.csn.charity.repository.ProjectRepository;
import com.csn.charity.service.interfaces.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> getAllProjects() {
        return this.projectRepository.findAll();
    }

    @Override
    public Project addProject(Project project) {
        return this.projectRepository.save(project);
    }

    @Override
    public Project updateProject(Long id, Project project) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));
        p.setCategory(project.getCategory());
        p.setTitle(project.getTitle());
        p.setAddress(project.getAddress());
        p.setContent(project.getContent());
        p.setStartDate(project.getStartDate());
        p.setEndDate(project.getEndDate());
        p.setTotalAmount(project.getTotalAmount());

        return this.projectRepository.save(p);
    }

    @Override
    public void deleteProject(Long id) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));
        projectRepository.delete(p);
    }

    @Override
    public Project getProjectById(Long id) {
        return this.projectRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));
    }

}
