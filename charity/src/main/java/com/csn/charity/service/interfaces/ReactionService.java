package com.csn.charity.service.interfaces;

import com.csn.charity.dto.UserReactPostDTO;
import com.csn.charity.model.UserReactPost;

public interface ReactionService {
    UserReactPost addReactPost(UserReactPostDTO userReactPostDTO);
}
