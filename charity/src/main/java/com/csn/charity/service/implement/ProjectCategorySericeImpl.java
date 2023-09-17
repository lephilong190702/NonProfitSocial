package com.csn.charity.service.implement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.model.ProjectCategory;
import com.csn.charity.repository.ProjectCategoryRepository;
import com.csn.charity.service.interfaces.ProjectCategoryService;


@Service
public class ProjectCategorySericeImpl implements ProjectCategoryService {
    @Autowired
    private ProjectCategoryRepository projectCategoryRepository;

    @Override
    public ProjectCategory addProjectCategory(ProjectCategory category) {
        return this.projectCategoryRepository.save(category);
    }

    @Override
    public List<ProjectCategory> getAllProjectCategories() {
       return this.projectCategoryRepository.findAll();
    }

    @Override
    public ProjectCategory getProjectCategoryById(Long id) {
        Optional<ProjectCategory> projectCategoryOptional = this.projectCategoryRepository.findById(id);
        return projectCategoryOptional.get();
    }
    
}
