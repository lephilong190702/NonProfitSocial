package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.Tag;
import java.util.List;


public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
}
