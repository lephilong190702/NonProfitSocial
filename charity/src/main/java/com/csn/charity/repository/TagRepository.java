package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.Tag;
import java.util.List;
import com.csn.charity.model.Post;



public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);

    List<Tag> findByPosts(Post post);
}
