package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.PostDTO;
import com.csn.charity.model.Post;

public interface PostService {
    Post createPost(PostDTO postDTO);
    Post updatePost(Long id, PostDTO postDTO);
    void deletePost(Long id);
    List<Post> getAll();
}
