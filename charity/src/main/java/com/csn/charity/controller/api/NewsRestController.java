package com.csn.charity.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<UserCommentNew> comment(@RequestBody CommentNewsDTO commentNewsDTO) {
        UserCommentNew userCommentNew = this.commentNewsService.createComment(commentNewsDTO);
        return new ResponseEntity<>(userCommentNew, HttpStatus.CREATED);
    }
}
