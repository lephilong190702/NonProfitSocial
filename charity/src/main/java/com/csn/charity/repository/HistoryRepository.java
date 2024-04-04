package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.History;

public interface HistoryRepository extends JpaRepository<History, Long> {
    
}
