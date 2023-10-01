package com.csn.charity.service.implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.PostDTO;
import com.csn.charity.model.Post;
import com.csn.charity.model.Tag;
import com.csn.charity.model.User;
import com.csn.charity.model.UserCommentPost;
import com.csn.charity.repository.PostRepository;
import com.csn.charity.repository.TagRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.PostService;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TagRepository tagRepository;

    @Override
    public Post createPost(PostDTO postDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User user = userRepository.findByUsername(username);
            if (user == null) {
                throw new SecurityException("Người dùng không tồn tại!!");
            }

            Post post = new Post();
            post.setContent(postDTO.getContent());
            post.setUser(user);
            post.setStatus(true);
            post.setCreateDate(new Date());

            List<Tag> postHashtags = new ArrayList<>();
            if (postDTO.getHashtags() != null && !postDTO.getHashtags().isEmpty()) {
                postDTO.getHashtags().forEach(hashtagName -> {
                    Tag existingHashtag = tagRepository.findByName(hashtagName);
                    if (existingHashtag == null) {
                        existingHashtag = new Tag();
                        existingHashtag.setName(hashtagName);
                        existingHashtag = tagRepository.save(existingHashtag);
                    }
                    postHashtags.add(existingHashtag);
                });
            }
            post.setTags(postHashtags);

            return postRepository.save(post);
        } else {
            throw new SecurityException("Không đủ quyền truy cập!!");
        }
    }

    @Override
    public List<Post> getAll() {
        return this.postRepository.findAll();
    }

    @Override
    public Post updatePost(Long id, PostDTO postDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Không đủ quyền truy cập!!!");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng!!");
        }

        Post post = this.postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài viết với ID: " + id));

        if (!post.getUser().equals(user)) {
            throw new SecurityException("Bạn không có quyền cập nhật bài viết này!!");
        }

        post.setContent(postDTO.getContent());
        List<Tag> postHashtags = new ArrayList<>();
        if (postDTO.getHashtags() != null && !postDTO.getHashtags().isEmpty()) {
            postDTO.getHashtags().forEach(hashtagName -> {
                Tag existingHashtag = tagRepository.findByName(hashtagName);
                if (existingHashtag == null) {
                    existingHashtag = new Tag();
                    existingHashtag.setName(hashtagName);
                    existingHashtag = tagRepository.save(existingHashtag);
                }
                postHashtags.add(existingHashtag);
            });
        }
        post.setTags(postHashtags);
        return this.postRepository.save(post);

    }

    @Override
    public void deletePost(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Không đủ quyền truy cập!!!");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng!!!");
        }

        Post post = this.postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài viết với ID: " + id));

        if (!post.getUser().equals(user)) {
            throw new SecurityException("Bạn không có quyền xóa bài viết này");
        }

        this.postRepository.delete(post);
    }
}
