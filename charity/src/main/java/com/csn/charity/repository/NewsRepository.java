package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.New;

public interface NewsRepository extends JpaRepository<New, Long>{
    
}
