package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.ProjectCategory;

public interface ProjectCategoryService {
    List<ProjectCategory> getAllProjectCategories();
    ProjectCategory addProjectCategory(ProjectCategory category);
    ProjectCategory getProjectCategoryById(Long id);
}
