package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.PostImage;

public interface PostImageRepository extends JpaRepository<PostImage, Long>{
    
}
