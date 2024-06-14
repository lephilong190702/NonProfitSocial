package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.TransportImage;

public interface TransportImageRepository extends JpaRepository<TransportImage, Long> {
    
}
