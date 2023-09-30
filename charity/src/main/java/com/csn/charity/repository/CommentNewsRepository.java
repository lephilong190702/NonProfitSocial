package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.csn.charity.model.UserCommentNew;
import java.util.List;


public interface CommentNewsRepository extends JpaRepository<UserCommentNew, Long>{
    @Query("SELECT c FROM UserCommentNew c WHERE c.news.id = :newsId")
    List<UserCommentNew> findByNewsId(@Param("newsId") Long newsId);
}
