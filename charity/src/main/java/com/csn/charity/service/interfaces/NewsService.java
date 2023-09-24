package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.New;

public interface NewsService {
    List<New> getAllNews();
    New getNewById(Long id);
    New addNew(New n);
    New updateNew(Long id, New n);
    void deleteNew(Long id);
}
