package com.csn.charity.service.implement;

import java.util.Date;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.UserReactPostDTO;
import com.csn.charity.model.Post;
import com.csn.charity.model.ReactionType;
import com.csn.charity.model.User;
import com.csn.charity.model.UserReactPost;
import com.csn.charity.repository.PostRepository;
import com.csn.charity.repository.ReactionRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.ReactionService;

@Service
public class ReactionServiceImpl implements ReactionService {
    @Autowired
    private ReactionRepository reactionRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserReactPost addReactPost(UserReactPostDTO userReactPostDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        Post post = this.postRepository.findById(userReactPostDTO.getPostId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Không tìm thấy bài viết với ID: " + userReactPostDTO.getPostId()));

        ReactionType reactionType = ReactionType.valueOf(userReactPostDTO.getReaction().toUpperCase());

        UserReactPost userReactPost = new UserReactPost();
        userReactPost.setUser(user);
        userReactPost.setPost(post);
        userReactPost.setCreateDate(new Date());
        userReactPost.setReaction(reactionType);

        return this.reactionRepository.save(userReactPost);
    }

}
