package com.csn.charity.service.interfaces;

import com.csn.charity.dto.CommentNewsDTO;
import com.csn.charity.model.UserCommentNew;

public interface CommentNewsService {
    UserCommentNew createComment(CommentNewsDTO commentNewsDTO);
}
