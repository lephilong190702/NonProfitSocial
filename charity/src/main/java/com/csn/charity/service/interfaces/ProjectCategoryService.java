package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.ProjectCategory;

public interface ProjectCategoryService {
    List<ProjectCategory> getAll();

    ProjectCategory add(ProjectCategory category);

    ProjectCategory get(Long id);

    ProjectCategory update(Long id, ProjectCategory category);

    void delete(Long id);
}
