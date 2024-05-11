package com.csn.charity.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.csn.charity.model.NewCategory;
import com.csn.charity.repository.NewsCategoryRepository;
import com.csn.charity.service.interfaces.NewsCategoryService;

@Service
public class NewsCategoryServiceImpl implements NewsCategoryService {
    @Autowired
    private NewsCategoryRepository newsCategoryRepository;

    @Override
    @Cacheable(value = "newCategories")
    public List<NewCategory> getAll() {
        return this.newsCategoryRepository.findAll();
    }

    @Override
    public NewCategory add(NewCategory category) {
        return this.newsCategoryRepository.save(category);
    }

    @Override
    @Cacheable(value = "newCategory", key = "#id")
    public NewCategory get(Long id) {
        return this.newsCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy thể loại với ID: " + id));
    }

    @Override
    public NewCategory update(Long id, NewCategory category) {
        NewCategory c = this.newsCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));

        c.setName(category.getName());
        return this.newsCategoryRepository.save(c);
    }

    @Override
    public void delete(Long id) {
        NewCategory category = this.newsCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));

        this.newsCategoryRepository.delete(category);
    }

}
