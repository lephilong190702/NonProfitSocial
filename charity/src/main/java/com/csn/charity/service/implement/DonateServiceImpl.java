package com.csn.charity.service.implement;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.model.Project;
import com.csn.charity.model.User;
import com.csn.charity.model.UserContributeProject;
import com.csn.charity.repository.DonateRepository;
import com.csn.charity.repository.ProjectRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.DonateService;

@Service
public class DonateServiceImpl implements DonateService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private DonateRepository donateRepository;

    @Override
    public UserContributeProject donate(Long projectId, UserContributeProject userContributeProject) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        Project project = this.projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + projectId));

        if (project.getContributedAmount().compareTo(project.getTotalAmount()) <= 0) {
            BigDecimal newContributedAmount = project.getContributedAmount()
                    .add(userContributeProject.getDonateAmount());
            project.setContributedAmount(newContributedAmount);
            this.projectRepository.save(project);

            userContributeProject.setProject(project);
            userContributeProject.setUser(user);
            userContributeProject.setDonateDate(new Date());
            return this.donateRepository.save(userContributeProject);
        } else {
            throw new IllegalArgumentException("Số tiền quyên góp đã đủ, xin cảm ơn.");
        }

    }

    @Override
    public List<UserContributeProject> getAllContribute() {
        return this.donateRepository.findAll();
    }

    @Override
    public List<UserContributeProject> getContributionByProject(Long id) {
        Project project = this.projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));
        
        return this.donateRepository.findByProject(project);
    }

}
