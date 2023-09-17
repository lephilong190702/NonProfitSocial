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
    
}
