package com.csn.charity.service.implement;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.csn.charity.model.ContributionCategory;
import com.csn.charity.model.Project;
import com.csn.charity.model.ProjectImage;
import com.csn.charity.model.TransportImage;
import com.csn.charity.model.User;
import com.csn.charity.model.UserContributeProject;
import com.csn.charity.model.UserRole;
import com.csn.charity.repository.ContributionCategoryRepository;
import com.csn.charity.repository.DonateRepository;
import com.csn.charity.repository.ProjectRepository;
import com.csn.charity.repository.TransportImageRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.DonateService;

@Service
public class DonateServiceImpl implements DonateService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private DonateRepository donateRepository;
    @Autowired
    private ContributionCategoryRepository contributionCategoryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransportImageRepository transportImageRepository;
    @Autowired
    private Cloudinary cloudinary;

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
            Long category = 1L;
            ContributionCategory contributionCategory = this.contributionCategoryRepository.findById(category)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Không tìm thấy thể loại quyên góp với ID: " + category));
            userContributeProject.setCategory(contributionCategory);

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

    @Override
    public UserContributeProject donateItems(Long projectId, UserContributeProject userContributeProject) {
        Project project = this.projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + projectId));
        userContributeProject.setDonateAmount(BigDecimal.valueOf(0));

        this.projectRepository.save(project);

        userContributeProject.setProject(project);
        Long category = 2L;
        ContributionCategory contributionCategory = this.contributionCategoryRepository.findById(category)
                .orElseThrow(
                        () -> new IllegalArgumentException("Không tìm thấy thể loại quyên góp với ID: " + category));
        userContributeProject.setCategory(contributionCategory);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Không đủ quyền truy cập!!!");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng!!");
        }

        Date date = new Date();
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        userContributeProject.setDonateDate(localDate);
        userContributeProject.setDonateItem(userContributeProject.getDonateItem());
        userContributeProject.setAddress(userContributeProject.getAddress());
        userContributeProject.setStatus("PENDING");
        userContributeProject.setUser(user);
        return this.donateRepository.save(userContributeProject);
    }

    @Override
    public List<UserContributeProject> getContributionByStatus() {
        return this.donateRepository.findByStatus("PENDING");
    }

    @Override
    public void updateTransport(Long transportId, Long shipperId) {
        Optional<UserContributeProject> contributeOptional = this.donateRepository.findById(transportId);
        Optional<User> userOptional = this.userRepository.findById(shipperId);

        if (contributeOptional.isPresent() && userOptional.isPresent()) {
            UserContributeProject userContributeProject = contributeOptional.get();
            User user = userOptional.get();

            User oldShipper = userContributeProject.getShipper();
            if (oldShipper != null) {
                userContributeProject.setShipper(null);
            }

            userContributeProject.setShipper(user);
            userContributeProject.setStatus("TRANSPORT");

            this.donateRepository.save(userContributeProject);
        } else {
            throw new RuntimeException("Không tìm thấy đơn vận chuyển");
        }
    }

    @Override
    public List<UserContributeProject> getTransportByStatus() {
        return this.donateRepository.findByStatus("TRANSPORT");
    }

    @Override
    public List<UserContributeProject> getTransportByShipper(Long userId) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy shipper với ID: " + userId));

        return this.donateRepository.findByShipper(user);
    }

    @Override
    public void shipperUpdateTransport(Long transportId, List<MultipartFile> files) {
        Optional<UserContributeProject> contributeOptional = this.donateRepository.findById(transportId);
        if (contributeOptional.isPresent()) {
            UserContributeProject userContributeProject = contributeOptional.get();
            if (files != null && !files.isEmpty()) {
                List<TransportImage> images = new ArrayList<>();
                try {
                    files.forEach(file -> {
                        if (!file.isEmpty()) {
                            try {
                                Map res = this.cloudinary.uploader().upload(file.getBytes(),
                                        ObjectUtils.asMap("resource_type", "auto"));

                                String imageUrl = res.get("secure_url").toString();
                                System.out.println("Image URL: " + imageUrl);
                                TransportImage img = new TransportImage();
                                img.setImage(imageUrl);
                                img.setUserContributeProject(userContributeProject);
                                donateRepository.save(userContributeProject);
                                images.add(img);
                                transportImageRepository.save(img);
                            } catch (IOException ex) {
                                Logger.getLogger(ProjectServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                            }
                        }
                    });
                    userContributeProject.setImages(images);
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
            userContributeProject.setStatus("SUCCESSFUL");
            this.donateRepository.save(userContributeProject);
        }
    }

    @Override
    public List<UserContributeProject> getContributionItemsByStatus() {
        return this.donateRepository.findByStatus("SUCCESSFUL");
    }

}
