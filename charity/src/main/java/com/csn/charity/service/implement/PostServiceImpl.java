package com.csn.charity.service.implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.PostRequest;
import com.csn.charity.model.Post;
import com.csn.charity.model.Tag;
import com.csn.charity.model.User;
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
    public Post createPost(PostRequest postRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User user = userRepository.findByUsername(username);
            if (user == null) {
                throw new SecurityException("User not found");
            }

            Post post = new Post();
            post.setContent(postRequest.getContent());
            post.setUser(user);
            post.setStatus(true);
            post.setCreateDate(new Date());

            List<Tag> postHashtags = new ArrayList<>();
            if (postRequest.getHashtags() != null && !postRequest.getHashtags().isEmpty()) {
                postRequest.getHashtags().forEach(hashtagName -> {
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
            throw new SecurityException("Unauthorized access");
        }
    }
    @Override
    public List<Post> getAll() {
        return this.postRepository.findAll();
    }
}
    