package com.csn.charity.service.implement;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.CommentNewsDTO;
import com.csn.charity.model.New;
import com.csn.charity.model.User;
import com.csn.charity.model.UserCommentNew;
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
    @Override
    public List<UserCommentNew> getCommentByNews(Long id) {
        this.newsRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tin tức với ID: " + id));

        List<UserCommentNew> commentNews = this.commentNewsRepository.findByNewsId(id);

        return commentNews;
        
    }
    @Override
    public void deleteCommentNews(Long id) {
        UserCommentNew userCommentNew = this.commentNewsRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bình luận với ID: " + id));

        this.commentNewsRepository.delete(userCommentNew);
    }
    
}
