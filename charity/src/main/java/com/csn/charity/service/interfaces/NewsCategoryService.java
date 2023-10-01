package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.NewCategory;

public interface NewsCategoryService {
    List<NewCategory> getAll();

    NewCategory add(NewCategory category);

    NewCategory get(Long id);

    NewCategory update(Long id, NewCategory category);

    void delete(Long id);
}
