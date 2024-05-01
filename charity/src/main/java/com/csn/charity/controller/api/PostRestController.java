package com.csn.charity.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.csn.charity.dto.CommentPostDTO;
import com.csn.charity.dto.PostDTO;
import com.csn.charity.dto.ReportDTO;
import com.csn.charity.dto.UserReactPostDTO;
import com.csn.charity.model.Post;
import com.csn.charity.model.UserCommentPost;
import com.csn.charity.model.UserReactPost;
import com.csn.charity.model.UserReportPost;
import com.csn.charity.service.interfaces.CommentPostService;
import com.csn.charity.service.interfaces.PostService;
import com.csn.charity.service.interfaces.ReactionService;
import com.csn.charity.service.interfaces.ReportService;
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
    @Autowired
    private ReactionService reactionService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/posts/")
    @CrossOrigin
    public ResponseEntity<?> getAllPost() {
        try {
            List<Post> posts = this.postService.getAll();
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/public-posts/")
    @CrossOrigin
    public ResponseEntity<?> getAvailablePost() {
        try {
            List<Post> posts = this.postService.getAvailablePosts();
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/private-posts/")
    @CrossOrigin
    public ResponseEntity<?> getUnAvailablePost() {
        try {
            List<Post> posts = this.postService.getUnAvailablePosts();
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/posts/{postId}")
    @CrossOrigin
    public ResponseEntity<?> getPostById(@PathVariable(value = "postId") Long postId) {
        try {
            Post post = this.postService.getPostById(postId);
            return new ResponseEntity<>(post, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(path = "/posts/")
    @CrossOrigin
    public ResponseEntity<?> createPost(@RequestParam(value = "content") String content,
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "tags", required = false) List<String> tags) {
        try {
            PostDTO postDTO = new PostDTO();
            postDTO.setContent(content);
            postDTO.setFiles(files);
            postDTO.setHashtags(tags);

            Post createdPost = postService.createPost(postDTO);
            messagingTemplate.convertAndSend("/topic/posts", createdPost);
            return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PutMapping("/posts/{id}")
    @CrossOrigin
    public ResponseEntity<String> updatePost(@PathVariable(value = "id") Long id,
            @RequestBody PostDTO postDTO) {
        try {
            this.postService.updatePost(id, postDTO);
            Post updatedPost = this.postService.getPostById(id);
            messagingTemplate.convertAndSend("/topic/posts/" + id, updatedPost);
            return ResponseEntity.ok("Bài viết đã được cập nhật thành công.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PatchMapping("/post/{id}")
    @CrossOrigin
    public ResponseEntity<?> activePost(@PathVariable(value = "id") Long id) {
        try {
            this.postService.activePost(id);
            return ResponseEntity.ok("Bài viết đã được cập nhật thành công.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/posts/{id}")
    @CrossOrigin
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        try {
            postService.deletePost(id);
            return ResponseEntity.ok("Bài viết đã được xóa thành công.");
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
    public ResponseEntity<?> createComment(@RequestBody CommentPostDTO commentPostDTO) {
        try {
            UserCommentPost uCommentPost = this.commentPostService.createComment(commentPostDTO);
            messagingTemplate.convertAndSend("/topic/comments/", uCommentPost);
            return new ResponseEntity<>(uCommentPost, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PutMapping("/post-comment/{id}")
    @CrossOrigin
    public ResponseEntity<String> updatePostComment(@PathVariable(value = "id") Long id,
            @RequestBody CommentPostDTO commentPostDTO) {
        try {
            this.commentPostService.updateComment(id, commentPostDTO);
            UserCommentPost updatedComment = this.commentPostService.getCommentById(id);
            messagingTemplate.convertAndSend("/topic/comments/" + updatedComment.getPost().getId(), updatedComment);
            return ResponseEntity.ok("Bình luận đã được cập nhật thành công.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @DeleteMapping("/post-comment/{id}")
    @CrossOrigin
    public ResponseEntity<String> deleteComment(@PathVariable Long id) {
        try {
            this.commentPostService.deleteCommentPost(id);
            UserCommentPost deletedComment = this.commentPostService.getCommentById(id);
            messagingTemplate.convertAndSend("/topic/comments/" + deletedComment.getPost().getId(), deletedComment);
            return ResponseEntity.ok("Bình luận đã được xóa thành công.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/post/{postId}/comments/")
    @CrossOrigin
    public ResponseEntity<?> getCommentByPost(@PathVariable(value = "postId") Long id) {
        try {
            List<UserCommentPost> comments = this.commentPostService.getCommentByPost(id);
            messagingTemplate.convertAndSend("/topic/comments/", comments);
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/post-comment/{parentId}/replies/")
    @CrossOrigin
    public ResponseEntity<?> addReplyToComment(@PathVariable Long parentId,
            @RequestBody UserCommentPost reply) {
        try {
            UserCommentPost addedReply = commentPostService.addReplyCommentPost(parentId, reply);
            messagingTemplate.convertAndSend("/topic/reply-comments/", addedReply);
            return new ResponseEntity<>(addedReply, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/post-comment/{parentId}/replies/")
    @CrossOrigin
    public ResponseEntity<List<UserCommentPost>> getAllRepliesComment(@PathVariable Long parentId) {
        List<UserCommentPost> replies = commentPostService.getAllReplyComments(parentId);
        messagingTemplate.convertAndSend("/topic/reply-comments/", replies);
        return new ResponseEntity<>(replies, HttpStatus.OK);
    }

    @PostMapping("/reaction/")
    @CrossOrigin
    public ResponseEntity<String> createReactionPost(@RequestBody UserReactPostDTO userReactPostDTO) {
        UserReactPost userReactPost = reactionService.addReactPost(userReactPostDTO);
        if (userReactPost != null) {
            messagingTemplate.convertAndSend("/topic/reactions/" + userReactPost.getPost().getId(), userReactPost);
            return ResponseEntity.ok("Thêm reaction thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm reaction thất bại.");
        }
    }

    @GetMapping("/reaction/{postId}")
    @CrossOrigin
    public ResponseEntity<?> getReactionByPost(@PathVariable Long postId) {
        try {
            List<UserReactPost> reactPosts = reactionService.getReactionByPost(postId);
            messagingTemplate.convertAndSend("/topic/reactions/" + postId, reactPosts);
            return new ResponseEntity<>(reactPosts, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/report/")
    @CrossOrigin
    public ResponseEntity<?> createReportPost(@RequestBody ReportDTO reportDTO) {
        UserReportPost userReportPost = reportService.report(reportDTO);
        if (userReportPost != null) {
            messagingTemplate.convertAndSend("/topic/reports/" + userReportPost.getPost().getId(), userReportPost);
            return new ResponseEntity<>(userReportPost, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Báo cáo thất bại.");
        }
    }

}
