package com.csn.charity.service.interfaces;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.csn.charity.model.New;

public interface NewsService {
    List<New> getAll();

    New get(Long id);

    New add(New n);

    New update(Long id, New n);

    void delete(Long id);

    List<New> findByName(String name);

    Long countNewsByCategory(Long categoryId);

    List<New> getNewsByCategory(Long categoryId);

    List<New> search(String kw);

    List<Map<String, String>> getNewsItems() throws IOException;
}
