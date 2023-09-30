package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.UserCommentPost;

public interface CommentPostRepository extends JpaRepository<UserCommentPost, Long>{
    
}
