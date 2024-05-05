package com.csn.charity.repository;

import java.util.List;

import com.csn.charity.model.New;
import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.Post;
import org.springframework.data.jpa.repository.Query;
import com.csn.charity.model.Tag;


public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByStatus(Boolean status);

    @Query("SELECT p FROM Post p WHERE p.status = true AND p.content LIKE CONCAT('%',:kw, '%')")
    List<Post> search(String kw);

    List<Post> findByTags(Tag tags);
}
