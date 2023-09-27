package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.NewCategory;

public interface NewsCategoryRepository extends JpaRepository<NewCategory, Long> {

}
