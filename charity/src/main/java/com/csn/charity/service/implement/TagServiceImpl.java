package com.csn.charity.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.model.Post;
import com.csn.charity.model.Project;
import com.csn.charity.model.Tag;
import com.csn.charity.repository.PostRepository;
import com.csn.charity.repository.TagRepository;
import com.csn.charity.service.interfaces.TagService;

@Service
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private PostRepository postRepository;

    @Override
    public List<Tag> getAll() {
        return this.tagRepository.findAll();
    }

    @Override
    public List<Tag> getTagsByPost(Long id) {
        Post post = this.postRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));
        return this.tagRepository.findByPosts(post);
    }

}
