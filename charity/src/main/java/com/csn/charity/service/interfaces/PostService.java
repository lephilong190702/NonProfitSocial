package com.csn.charity.service.interfaces;

import java.util.List;
import java.util.Set;

import com.csn.charity.dto.PostRequest;
import com.csn.charity.model.Post;

public interface PostService {
    Post createPost(PostRequest postRequest);
    List<Post> getAll();
}
