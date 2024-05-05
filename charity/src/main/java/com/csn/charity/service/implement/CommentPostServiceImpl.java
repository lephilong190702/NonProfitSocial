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
import com.csn.charity.model.Notification;
import com.csn.charity.model.Post;
import com.csn.charity.model.User;
import com.csn.charity.model.UserCommentPost;
import com.csn.charity.repository.CommentPostRepository;
import com.csn.charity.repository.NotificationRepository;
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
    @Autowired
    private NotificationRepository notificationRepository;

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

        Notification notification = new Notification();
        notification.setPost(post);
        notification.setStatus(false);
        notification.setUser(post.getUser());
        notification.setCreateDate(new Date());
        notification.setDescription("Người dùng " + user.getProfile().getFirstName() +  user.getProfile().getLastName() + " vừa bình luận bài viết của bạn !!!");
        notificationRepository.save(notification);
        return commentPostRepository.save(userCommentPost);
    }

    @Override
    public UserCommentPost updateComment(Long id, CommentPostDTO commentPostDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        UserCommentPost userCommentPost = this.commentPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bình luận với ID: " + id));

        if (!userCommentPost.getUser().equals(user)) {
            throw new SecurityException("Bạn không có quyền cập nhật bình luận này");
        }

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

    @Override
    public void deleteCommentPost(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        UserCommentPost userCommentPost = this.commentPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bình luận với ID: " + id));

        if (!userCommentPost.getUser().equals(user)) {
            throw new SecurityException("Bạn không có quyền xóa bình luận này");
        }

        this.commentPostRepository.delete(userCommentPost);
    }

    @Override
    public UserCommentPost addReplyCommentPost(Long parentId, UserCommentPost reply) {
        Optional<UserCommentPost> parentCommentOptional = commentPostRepository.findById(parentId);
        if (parentCommentOptional.isPresent()) {
            UserCommentPost parentComment = parentCommentOptional.get();

            reply.setComment(parentComment);
            reply.setCreateDate(new Date());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                throw new SecurityException("Unauthorized access");
            }

            String username = authentication.getName();
            User user = userRepository.findByUsername(username);
            if (user == null) {
                throw new NoSuchElementException("Không tìm thấy người dùng");
            }
            reply.setUser(user);

            parentComment.getReplies().add(reply);

            return commentPostRepository.save(reply);
        } else {
            throw new NoSuchElementException("Không tìm thấy bình luận gốc với ID: " + parentId);
        }
    }

    @Override
    public List<UserCommentPost> getAllReplyComments(Long parentId) {
        Optional<UserCommentPost> parentCommentOptional = commentPostRepository.findById(parentId);

        if (parentCommentOptional.isPresent()) {
            UserCommentPost parentComment = parentCommentOptional.get();
            return parentComment.getReplies();
        } else {
            throw new NoSuchElementException("Không tìm thấy bình luận gốc với ID: " + parentId);
        }
    }

    @Override
    public UserCommentPost getCommentById(Long id) {
        return this.commentPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bình luận với ID: " + id));
    }
}
