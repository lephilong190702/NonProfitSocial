package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.UserCommentNew;

public interface CommentNewsRepository extends JpaRepository<UserCommentNew, Long>{
    
}
