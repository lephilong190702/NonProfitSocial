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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/posts/")
    @CrossOrigin
    public ResponseEntity<?> getAllPost() {
        try {
            return new ResponseEntity<>(this.postService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/public-posts/")
    @CrossOrigin
    public ResponseEntity<?> getAvailablePost() {
        try {
            return new ResponseEntity<>(this.postService.getAvailablePosts(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/posts/{postId}")
    @CrossOrigin
    public ResponseEntity<?> getPostById(@PathVariable(value = "postId") Long postId) {
        try {
            return new ResponseEntity<>(this.postService.getPostById(postId), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(path = "/posts/")
    @CrossOrigin
    public ResponseEntity<Post> createPost(@RequestParam(value = "content") String content,
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "tags", required = false) List<String> tags) {

        PostDTO postDTO = new PostDTO();
        postDTO.setContent(content);
        postDTO.setFiles(files);
        postDTO.setHashtags(tags);

        Post createdPost = postService.createPost(postDTO);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @PutMapping("/posts/{id}")
    @CrossOrigin
    public ResponseEntity<String> updatePost(@PathVariable(value = "id") Long id,
            @RequestBody PostDTO postDTO) {
        this.postService.updatePost(id, postDTO);
        return ResponseEntity.ok("Bài viết đã được cập nhật thành công.");
    }

    @DeleteMapping("/posts/{id}")
    @CrossOrigin
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok("Bài viết đã được xóa thành công.");
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
    public ResponseEntity<UserCommentPost> createComment(@RequestBody CommentPostDTO commentPostDTO) {
        UserCommentPost uCommentPost = this.commentPostService.createComment(commentPostDTO);
        return new ResponseEntity<>(uCommentPost, HttpStatus.CREATED);
    }

    @PutMapping("/post-comment/{id}")
    @CrossOrigin
    public ResponseEntity<String> updatePostComment(@PathVariable(value = "id") Long id,
            @RequestBody CommentPostDTO commentPostDTO) {
        this.commentPostService.updateComment(id, commentPostDTO);
        return ResponseEntity.ok("Bình luận đã được cập nhật thành công.");
    }

    @DeleteMapping("/post-comment/{id}")
    @CrossOrigin
    public ResponseEntity<String> deleteComment(@PathVariable Long id) {
        commentPostService.deleteCommentPost(id);
        return ResponseEntity.ok("Bình luận đã được xóa thành công.");
    }

    @GetMapping("/post/{postId}/comments/")
    @CrossOrigin
    public ResponseEntity<List<UserCommentPost>> listComment(@PathVariable(value = "postId") Long id) {
        return new ResponseEntity<>(this.commentPostService.getCommentByPost(id), HttpStatus.OK);
    }

    @PostMapping("/post-comment/{parentId}/replies/")
    @CrossOrigin
    public ResponseEntity<UserCommentPost> addReplyToComment(@PathVariable Long parentId,
            @RequestBody UserCommentPost reply) {
        UserCommentPost addedReply = commentPostService.addReplyCommentPost(parentId, reply);
        return new ResponseEntity<>(addedReply, HttpStatus.CREATED);
    }

    @GetMapping("/post-comment/{parentId}/replies/")
    @CrossOrigin
    public ResponseEntity<List<UserCommentPost>> getAllRepliesComment(@PathVariable Long parentId) {
        List<UserCommentPost> replies = commentPostService.getAllReplyComments(parentId);
        return new ResponseEntity<>(replies, HttpStatus.OK);
    }

    @PostMapping("/reaction/")
    @CrossOrigin
    public ResponseEntity<String> reactPost(@RequestBody UserReactPostDTO userReactPostDTO) {
        UserReactPost userReactPost = reactionService.addReactPost(userReactPostDTO);
        if (userReactPost != null) {
            return ResponseEntity.ok("Thêm reaction thành công");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm reaction thất bại.");
        }
    }

    @GetMapping("/reaction/{postId}")
    public ResponseEntity<List<UserReactPost>> getReactionByPost(@PathVariable Long postId){
        List<UserReactPost> reactPosts = reactionService.getReactionByPost(postId);
        return new ResponseEntity<>(reactPosts, HttpStatus.OK);
    }

    @PostMapping("/report/")
    @CrossOrigin
    public ResponseEntity<?> reportPost(@RequestBody ReportDTO reportDTO) {
        UserReportPost userReportPost = reportService.report(reportDTO);
        if (userReportPost != null) {
            return new ResponseEntity<>(userReportPost, HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Báo cáo thất bại.");
        }
    }

}
