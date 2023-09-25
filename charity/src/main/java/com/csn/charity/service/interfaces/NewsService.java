package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.New;

public interface NewsService {
    List<New> getAll();
    New get(Long id);
    New add(New n);
    New update(Long id, New n);
    void delete(Long id);
    List<New> findByName(String name);
}
