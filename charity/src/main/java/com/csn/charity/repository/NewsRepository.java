package com.csn.charity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.csn.charity.model.New;

public interface NewsRepository extends JpaRepository<New, Long> {
    @Query("SELECT n FROM New n WHERE LOWER(n.name) LIKE %?1%")
    List<New> findByName(String name);
}
