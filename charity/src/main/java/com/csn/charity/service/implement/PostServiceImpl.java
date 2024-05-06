package com.csn.charity.service.implement;

import java.io.IOException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.csn.charity.model.*;
import com.csn.charity.repository.*;

import org.checkerframework.checker.units.qual.t;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.csn.charity.dto.PostDTO;
import com.csn.charity.service.interfaces.PostService;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private PostImageRepository postImageRepository;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private NotificationRepository notificationRepository;

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
            post.setStatus(false);
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
            System.out.println("TAG" + postHashtags);

            if (postDTO.getFiles() != null && !postDTO.getFiles().isEmpty()) {
                List<PostImage> images = new ArrayList<>();
                try {
                    postDTO.getFiles().forEach(file -> {
                        if (!file.isEmpty()) {
                            try {
                                Map res = this.cloudinary.uploader().upload(file.getBytes(),
                                        ObjectUtils.asMap("resource_type", "auto"));

                                String imageUrl = res.get("secure_url").toString();
                                System.out.println("Image URL: " + imageUrl);
                                PostImage img = new PostImage();
                                img.setImage(imageUrl);
                                img.setPost(post);
                                postRepository.save(post);
                                images.add(img);
                                postImageRepository.save(img);
                            } catch (IOException ex) {
                                Logger.getLogger(ProjectServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                            }
                        }
                    });
                    post.setImages(images);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
            return this.postRepository.save(post);
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
        if (authentication == null ||!authentication.isAuthenticated()) {
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
        post.setStatus(false);

        // Clear old images
        post.getImages().clear();
        postImageRepository.deleteAll(post.getImages());

        // Add new images
        if (postDTO.getFiles() != null && !postDTO.getFiles().isEmpty()) {
            List<PostImage> images = new ArrayList<>();
            try {
                postDTO.getFiles().forEach(file -> {
                    if (!file.isEmpty()) {
                        try {
                            Map res = this.cloudinary.uploader().upload(file.getBytes(),
                                    ObjectUtils.asMap("resource_type", "auto"));

                            String imageUrl = res.get("secure_url").toString();
                            System.out.println("Image URL: " + imageUrl);
                            PostImage img = new PostImage();
                            img.setImage(imageUrl);
                            img.setPost(post);
                            postRepository.save(post);
                            images.add(img);
                            postImageRepository.save(img);
                        } catch (IOException ex) {
                            Logger.getLogger(ProjectServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    }
                });
                post.setImages(images);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
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

        UserRole userRole = roleRepository.findByName("ROLE_EMPLOYEE");

        if (user.getRoles().contains(userRole) || post.getUser().equals(user)) {
            this.postRepository.delete(post);
        } else {
            throw new SecurityException("Bạn không có quyền xóa bài viết này");
        }

        // this.postRepository.delete(post);
    }

    @Override
    public Post getPostById(Long id) {
        return this.postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài viết với ID: " + id));
    }

    @Override
    public List<Post> getAvailablePosts() {
        return this.postRepository.findByStatus(true);
    }

    @Override
    public List<Post> getUnAvailablePosts() {
        return this.postRepository.findByStatus(false);
    }

    @Override
    public void activePost(Long id) {
        Post post = this.postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài viết với ID: " + id));
        post.setStatus(true);
        this.postRepository.save(post);

        Notification notification = new Notification();
        notification.setPost(post);
        notification.setStatus(false);
        notification.setUser(post.getUser());
        notification.setCreateDate(new Date());
        notification.setDescription("Bài viết của bạn đã được duyệt !!!");
        notificationRepository.save(notification);
    }

    @Override
    public void denyPost(Long id) {
        Post post = this.postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài viết với ID: " + id));
        post.setStatus(false);
        this.postRepository.save(post);
    }

    @Override
    public List<Post> search(String kw) {
        return postRepository.search(kw);
    }


    @Override
    public List<Post> getPostsByTags(String name) {
        Tag tag = this.tagRepository.findByName(name);
        
        return this.postRepository.findByTags(tag);
    }
}
