package com.csn.charity.service.implement;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.csn.charity.model.ContributionCategory;
import com.csn.charity.model.Project;

import com.csn.charity.model.UserContributeProject;
import com.csn.charity.repository.ContributionCategoryRepository;
import com.csn.charity.repository.DonateRepository;
import com.csn.charity.repository.ProjectRepository;
import com.csn.charity.service.interfaces.DonateService;

@Service
public class DonateServiceImpl implements DonateService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private DonateRepository donateRepository;
    @Autowired
    private ContributionCategoryRepository contributionCategoryRepository;

    @Override
    public UserContributeProject donate(Long projectId, UserContributeProject userContributeProject) {
        Project project = this.projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + projectId));

        if (project.getContributedAmount().compareTo(project.getTotalAmount()) <= 0) {
            BigDecimal newContributedAmount = project.getContributedAmount()
                    .add(userContributeProject.getDonateAmount());
            project.setContributedAmount(newContributedAmount);
            this.projectRepository.save(project);

            userContributeProject.setProject(project);

            Date date = new Date();

            // Convert java.util.Date to java.time.LocalDate
            LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            userContributeProject.setDonateDate(localDate);
            ;
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

    @Override
    public List<UserContributeProject> getContributionByCategory(Long id) {
        ContributionCategory contributionCategory = this.contributionCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));

        return this.donateRepository.findByCategory(contributionCategory);
    }

}
