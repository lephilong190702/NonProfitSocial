package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.CommentPostDTO;
import com.csn.charity.model.UserCommentPost;

public interface CommentPostService {
    UserCommentPost createComment(CommentPostDTO commentPostDTO);

    List<UserCommentPost> getCommentByPost(Long id);

    UserCommentPost getCommentById(Long id);

    void deleteCommentPost(Long id);

    UserCommentPost addReplyCommentPost(Long parentId, UserCommentPost reply);

    List<UserCommentPost> getAllReplyComments(Long parentId);

    UserCommentPost updateComment(Long id, UserCommentPost uCommentPost);

    UserCommentPost updateReplyCommentPost(Long id, UserCommentPost reply);

    void deleteReplyCommentPost(Long id);

}
