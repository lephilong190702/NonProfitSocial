package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.CommentNewsDTO;
import com.csn.charity.model.UserCommentNew;

public interface CommentNewsService {
    UserCommentNew createComment(CommentNewsDTO commentNewsDTO);
    List<UserCommentNew> getCommentByNews(Long id);
}
