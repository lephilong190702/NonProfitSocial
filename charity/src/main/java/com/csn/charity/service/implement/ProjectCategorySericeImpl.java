package com.csn.charity.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.csn.charity.model.ProjectCategory;
import com.csn.charity.repository.ProjectCategoryRepository;
import com.csn.charity.service.interfaces.ProjectCategoryService;

@Service
public class ProjectCategorySericeImpl implements ProjectCategoryService {
    @Autowired
    private ProjectCategoryRepository projectCategoryRepository;

    @Override
    public ProjectCategory add(ProjectCategory category) {
        return this.projectCategoryRepository.save(category);
    }

    @Override
    @Cacheable(value = "projectCategories")
    public List<ProjectCategory> getAll() {
        return this.projectCategoryRepository.findAll();
    }

    @Override
    @Cacheable(value = "projectCategory", key = "#id")
    public ProjectCategory get(Long id) {
        return this.projectCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy thể loại với ID: " + id));
    }

    @Override
    public ProjectCategory update(Long id, ProjectCategory category) {
        ProjectCategory c = this.projectCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy với ID: " + id));

        c.setName(category.getName());
        return this.projectCategoryRepository.save(c);

    }

    @Override
    public void delete(Long id) {
        ProjectCategory category = this.projectCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));

        this.projectCategoryRepository.delete(category);
    }

}
