package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.UserReactPostDTO;
import com.csn.charity.model.UserReactPost;

public interface ReactionService {
    UserReactPost addReactPost(UserReactPostDTO userReactPostDTO);
    List<UserReactPost> getReactionByPost(Long postId);
}
