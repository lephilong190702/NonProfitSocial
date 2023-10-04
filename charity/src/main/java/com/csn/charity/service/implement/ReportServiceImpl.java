package com.csn.charity.service.implement;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.ReportDTO;
import com.csn.charity.model.Post;
import com.csn.charity.model.User;
import com.csn.charity.model.UserReportPost;
import com.csn.charity.repository.PostRepository;
import com.csn.charity.repository.ReportRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.ReportService;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    @Override
    public List<UserReportPost> getReportPost() {
        return this.reportRepository.findByResolved(false);
    }

    @Override
    public void resolvedReport(Long reportId) {
        Optional<UserReportPost> reportOptional = reportRepository.findById(reportId);
        reportOptional.ifPresent(report -> {
            Optional<Post> postOptional = postRepository.findById(report.getPost().getId());
            postOptional.ifPresent(post -> {
                if (post.getStatus()) {
                    post.setStatus(false);
                    postRepository.save(post);
                }
            });
            report.setResolved(true);
            reportRepository.save(report);
        });
    }

    @Override
    public UserReportPost report(ReportDTO reportDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        Post post = this.postRepository.findById(reportDTO.getPostId())
                .orElseThrow(
                        () -> new IllegalArgumentException("Không tìm thấy bài viết với ID: " + reportDTO.getPostId()));

        UserReportPost userReportPost = new UserReportPost();
        userReportPost.setUser(user);
        userReportPost.setPost(post);
        userReportPost.setContent(reportDTO.getContent());
        userReportPost.setResolved(false);
        userReportPost.setCreateDate(new Date());

        return this.reportRepository.save(userReportPost);
    }

    @Override
    public UserReportPost getById(Long id) {
        return this.reportRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy báo cáo với ID: " + id));
    }

}
