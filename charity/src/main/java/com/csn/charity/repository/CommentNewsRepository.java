package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.csn.charity.model.New;
import com.csn.charity.model.UserCommentNew;
import java.util.List;

public interface CommentNewsRepository extends JpaRepository<UserCommentNew, Long> {
    List<UserCommentNew> findByNews(New news);
}
