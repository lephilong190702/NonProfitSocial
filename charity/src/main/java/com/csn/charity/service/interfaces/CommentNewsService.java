package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.CommentNewsDTO;
import com.csn.charity.model.UserCommentNew;
import com.csn.charity.model.UserCommentPost;

public interface CommentNewsService {
    UserCommentNew createComment(CommentNewsDTO commentNewsDTO);
    List<UserCommentNew> getCommentByNews(Long id);
    void deleteCommentNews(Long id);
    UserCommentNew addReplyCommentNew(Long parentId, UserCommentNew reply);
    List<UserCommentNew> getAllReplyComments(Long parentId);
}
