package com.csn.charity.service.implement;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.CommentNewsDTO;
import com.csn.charity.model.New;
import com.csn.charity.model.Post;
import com.csn.charity.model.User;
import com.csn.charity.model.UserCommentNew;
import com.csn.charity.model.UserCommentPost;
import com.csn.charity.repository.CommentNewsRepository;
import com.csn.charity.repository.NewsRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.CommentNewsService;

@Service
public class CommentNewsServiceImpl implements CommentNewsService {
    @Autowired
    private CommentNewsRepository commentNewsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NewsRepository newsRepository;
    @Override
    public UserCommentNew createComment(CommentNewsDTO commentNewsDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        Optional<New> optionalNews = newsRepository.findById(commentNewsDTO.getNewsId());
        if (optionalNews.isEmpty()) {
            throw new NoSuchElementException("Không tìm thấy tin tức");
        }

        New n = optionalNews.get();
        UserCommentNew userCommentNew = new UserCommentNew();
        userCommentNew.setUser(user);
        userCommentNew.setCreateDate(new Date());
        userCommentNew.setNews(n);
        userCommentNew.setContent(commentNewsDTO.getContent());

        return commentNewsRepository.save(userCommentNew);
    }
    
}
