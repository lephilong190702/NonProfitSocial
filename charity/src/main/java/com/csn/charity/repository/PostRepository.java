package com.csn.charity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByStatus(Boolean status);
}
