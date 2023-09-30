package com.csn.charity.controller.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.dto.CommentPostDTO;
import com.csn.charity.dto.PostRequest;
import com.csn.charity.model.Post;
import com.csn.charity.model.UserCommentPost;
import com.csn.charity.service.interfaces.CommentPostService;
import com.csn.charity.service.interfaces.PostService;
import com.csn.charity.service.interfaces.TagService;

@RestController
@RequestMapping("/api")
public class PostRestController {
    @Autowired
    private PostService postService;
    @Autowired
    private TagService tagService;
    @Autowired
    private CommentPostService commentPostService;

    @PostMapping("/create-post/")
    @CrossOrigin
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest) {
        Post createdPost = postService.createPost(postRequest);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @GetMapping("/posts/")
    @CrossOrigin
    public ResponseEntity<?> getAllPost() {
        try {
            return new ResponseEntity<>(this.postService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/tags/")
    @CrossOrigin
    public ResponseEntity<?> getPostByTag() {
        try {
            return new ResponseEntity<>(this.tagService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/post-comment/")
    @CrossOrigin
    public ResponseEntity<UserCommentPost> comment(@RequestBody CommentPostDTO commentPostDTO) {
        UserCommentPost uCommentPost = this.commentPostService.createComment(commentPostDTO);
        return new ResponseEntity<>(uCommentPost, HttpStatus.CREATED);
    }

    @GetMapping("/post/{postId}/comments/")
    @CrossOrigin
    public ResponseEntity<List<UserCommentPost>> listComment(@PathVariable(value = "postId") Long id) {
        return new ResponseEntity<>(this.commentPostService.getCommentByPost(id), HttpStatus.OK);
    }

    @DeleteMapping("/post/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        commentPostService.deleteCommentPost(commentId);
        return ResponseEntity.ok("Bình luận đã được xóa thành công.");
    }
}
