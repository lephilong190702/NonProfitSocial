package com.csn.charity.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.model.New;
import com.csn.charity.repository.NewsRepository;
import com.csn.charity.service.interfaces.NewsService;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsRepository newsRepository;
    @Override
    public List<New> getAllNews() {
        return this.newsRepository.findAll();
    }

    @Override
    public New getNewById(Long id) {
        return this.newsRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));
    }

    @Override
    public New addNew(New n) {
        return this.newsRepository.save(n);
    }

    @Override
    public New updateNew(Long id, New n) {
        New news = this.newsRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));
        
        news.setCategory(n.getCategory());
        news.setName(n.getName());
        news.setContent(n.getContent());
        news.setCreateDate(n.getCreateDate());
        news.setImage(n.getImage());
        
        return this.newsRepository.save(news);
    }

    @Override
    public void deleteNew(Long id) {
        New n = this.newsRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));

        this.newsRepository.delete(n);
    }
    
}
