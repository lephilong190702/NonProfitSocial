package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.UserReactPost;

public interface ReactionRepository extends JpaRepository<UserReactPost, Long> {
    
}
