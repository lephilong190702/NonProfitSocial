package com.csn.charity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.csn.charity.model.UserCommentPost;

public interface CommentPostRepository extends JpaRepository<UserCommentPost, Long>{
    @Query("SELECT c FROM UserCommentPost c WHERE c.post.id = :postId")
    List<UserCommentPost> findByPostId(@Param("postId") Long postId);
}
