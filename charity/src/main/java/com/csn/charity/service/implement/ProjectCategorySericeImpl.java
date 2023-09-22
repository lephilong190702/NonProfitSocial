package com.csn.charity.service.implement;

import java.util.List;


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
        return this.projectCategoryRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy thể loại với ID: " + id));
    }
    
}
