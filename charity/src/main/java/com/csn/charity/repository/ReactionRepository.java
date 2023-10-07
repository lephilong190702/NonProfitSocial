package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.Post;
import com.csn.charity.model.UserReactPost;
import java.util.List;


public interface ReactionRepository extends JpaRepository<UserReactPost, Long> {
    List<UserReactPost> findByPost(Post post);
}
