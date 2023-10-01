package com.csn.charity.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.model.Tag;
import com.csn.charity.repository.TagRepository;
import com.csn.charity.service.interfaces.TagService;

@Service
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<Tag> getAll() {
        return this.tagRepository.findAll();
    }
    
}
