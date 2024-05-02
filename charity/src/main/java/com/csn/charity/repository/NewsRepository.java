package com.csn.charity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.csn.charity.model.New;
import com.csn.charity.model.NewCategory;

public interface NewsRepository extends JpaRepository<New, Long> {
    @Query("SELECT n FROM New n WHERE LOWER(n.name) LIKE %?1%")
    List<New> findByName(String name);

    @Query("SELECT COUNT(n) FROM New n WHERE n.category.id = :categoryId")
    Long countNewsByCategoryId(@Param("categoryId") Long categoryId);

    List<New> findByCategory(NewCategory category);

    @Query("SELECT n FROM New n WHERE n.name LIKE CONCAT('%',:kw, '%') Or n.content LIKE CONCAT('%', :kw, '%')")
    List<New> search(String kw);
}
