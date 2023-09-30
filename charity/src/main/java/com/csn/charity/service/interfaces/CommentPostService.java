package com.csn.charity.service.interfaces;

import com.csn.charity.dto.CommentPostDTO;
import com.csn.charity.model.UserCommentPost;

public interface CommentPostService {
    UserCommentPost createComment(CommentPostDTO commentPostDTO);

}
