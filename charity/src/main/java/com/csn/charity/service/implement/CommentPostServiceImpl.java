package com.csn.charity.service.implement;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.CommentPostDTO;
import com.csn.charity.model.Post;
import com.csn.charity.model.User;
import com.csn.charity.model.UserCommentNew;
import com.csn.charity.model.UserCommentPost;
import com.csn.charity.repository.CommentPostRepository;
import com.csn.charity.repository.PostRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.CommentPostService;

@Service
public class CommentPostServiceImpl implements CommentPostService {
    @Autowired
    private CommentPostRepository commentPostRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    @Override
    public UserCommentPost createComment(CommentPostDTO commentPostDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        Optional<Post> optionalPost = postRepository.findById(commentPostDTO.getPostId());
        if (optionalPost.isEmpty()) {
            throw new NoSuchElementException("Không tìm thấy bài viết");
        }

        Post post = optionalPost.get();

        UserCommentPost userCommentPost = new UserCommentPost();
        userCommentPost.setUser(user);
        userCommentPost.setCreateDate(new Date());
        userCommentPost.setPost(post);
        userCommentPost.setContent(commentPostDTO.getContent());

        return commentPostRepository.save(userCommentPost);
    }

    @Override
    public List<UserCommentPost> getCommentByPost(Long id) {
        this.postRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài viết với ID: " + id));

        List<UserCommentPost> commentPosts = this.commentPostRepository.findByPostId(id);

        return commentPosts;
    }

}
