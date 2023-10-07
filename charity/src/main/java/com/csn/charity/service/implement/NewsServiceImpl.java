package com.csn.charity.service.implement;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.csn.charity.model.New;
import com.csn.charity.repository.NewsRepository;
import com.csn.charity.service.interfaces.NewsService;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsRepository newsRepository;
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public List<New> getAll() {
        return this.newsRepository.findAll();
    }

    @Override
    public New get(Long id) {
        return this.newsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));
    }

    @Override
    public New add(New n) {
        if (!n.getFile().isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(n.getFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));

                n.setImage(res.get("secure_url").toString());

            } catch (IOException ex) {
                Logger.getLogger(NewsServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        n.setCreateDate(new Date());
        return this.newsRepository.save(n);
    }

    @Override
    public New update(Long id, New n) {
        New news = this.newsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));

        news.setCategory(n.getCategory());
        news.setName(n.getName());
        news.setContent(n.getContent());
        news.setCreateDate(n.getCreateDate());
        if (!n.getFile().isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(n.getFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));

                news.setImage(res.get("secure_url").toString());

            } catch (IOException ex) {
                Logger.getLogger(NewsServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return this.newsRepository.save(news);
    }

    @Override
    public void delete(Long id) {
        New n = this.newsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));

        this.newsRepository.delete(n);
    }

    @Override
    public List<New> findByName(String name) {
        return this.newsRepository.findByName(name);
    }

    @Override
    public Long countNewsByCategory(Long categoryId) {
        return this.newsRepository.countNewsByCategoryId(categoryId);
    }

}
