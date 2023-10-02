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
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.dto.CommentNewsDTO;
import com.csn.charity.model.UserCommentNew;
import com.csn.charity.service.interfaces.CommentNewsService;
import com.csn.charity.service.interfaces.NewsCategoryService;
import com.csn.charity.service.interfaces.NewsService;

@RestController
@RequestMapping("/api")
public class NewsRestController {
    @Autowired
    private NewsService newsService;
    @Autowired
    private NewsCategoryService newsCategoryService;
    @Autowired
    private CommentNewsService commentNewsService;

    @GetMapping("/news/")
    @CrossOrigin
    public ResponseEntity<?> getAllNews() {
        try {
            return new ResponseEntity<>(this.newsService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/news/{newsId}")
    @CrossOrigin
    public ResponseEntity<?> getNewsById(@PathVariable(value = "newsId") Long newsId) {
        try {
            return new ResponseEntity<>(this.newsService.get(newsId), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/ncategories/")
    @CrossOrigin
    public ResponseEntity<?> getAllCategory() {
        try {
            return new ResponseEntity<>(this.newsCategoryService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/news-comment/")
    @CrossOrigin
    public ResponseEntity<UserCommentNew> createComment(@RequestBody CommentNewsDTO commentNewsDTO) {
        UserCommentNew userCommentNew = this.commentNewsService.createComment(commentNewsDTO);
        return new ResponseEntity<>(userCommentNew, HttpStatus.CREATED);
    }

    @PutMapping("/news-comment/{id}")
    @CrossOrigin
    public ResponseEntity<String> updateNewsComment(@PathVariable(value = "id") Long id,
            @RequestBody CommentNewsDTO commentNewsDTO) {
        this.commentNewsService.updateComment(id, commentNewsDTO);
        return ResponseEntity.ok("Bình luận đã được cập nhật thành công.");
    }

    @DeleteMapping("/news-comment/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id) {
        commentNewsService.deleteCommentNews(id);
        return ResponseEntity.ok("Bình luận đã được xóa thành công.");
    }

    @GetMapping("/news/{newsId}/comments/")
    @CrossOrigin
    public ResponseEntity<List<UserCommentNew>> listComment(@PathVariable(value = "newsId") Long id) {
        return new ResponseEntity<>(this.commentNewsService.getCommentByNews(id), HttpStatus.OK);
    }

    @PostMapping("/news-comment/{parentId}/replies/")
    @CrossOrigin
    public ResponseEntity<UserCommentNew> addReplyToComment(@PathVariable Long parentId, @RequestBody UserCommentNew reply) {
        UserCommentNew addedReply = commentNewsService.addReplyCommentNew(parentId, reply);
        return new ResponseEntity<>(addedReply, HttpStatus.CREATED);
    }

    @GetMapping("/news-comment/{parentId}/replies/")
    @CrossOrigin
    public ResponseEntity<List<UserCommentNew>> getAllRepliesComment(@PathVariable Long parentId) {
        List<UserCommentNew> replies =commentNewsService.getAllReplyComments(parentId);
        return new ResponseEntity<>(replies, HttpStatus.OK);
    }
}
