package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.PostDTO;
import com.csn.charity.model.New;
import com.csn.charity.model.Post;

public interface PostService {
    Post createPost(PostDTO postDTO);

    Post updatePost(Long id, PostDTO postDTO);

    void deletePost(Long id);

    List<Post> getAll();

    Post getPostById(Long id);

    List<Post> getAvailablePosts();
    List<Post> getUnAvailablePosts();

    void activePost(Long id);
    void denyPost(Long id);

    List<Post> search(String kw);
}
