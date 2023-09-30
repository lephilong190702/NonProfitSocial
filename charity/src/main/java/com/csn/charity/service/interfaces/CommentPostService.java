package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.CommentPostDTO;
import com.csn.charity.model.UserCommentPost;

public interface CommentPostService {
    UserCommentPost createComment(CommentPostDTO commentPostDTO);
    List<UserCommentPost> getCommentByPost(Long id);
    void deleteCommentPost(Long id);
}
