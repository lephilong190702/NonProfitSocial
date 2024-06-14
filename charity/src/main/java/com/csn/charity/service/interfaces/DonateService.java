package com.csn.charity.service.interfaces;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.csn.charity.model.UserContributeProject;

public interface DonateService {
    UserContributeProject donate(Long projectId, UserContributeProject userContributeProject);

    void updateTransport(Long transportId, Long shipperId);

    void shipperUpdateTransport(Long transportId, List<MultipartFile> files);

    UserContributeProject donateItems(Long projectId, UserContributeProject userContributeProject);

    List<UserContributeProject> getAllContribute();

    List<UserContributeProject> getContributionByProject(Long id);

    List<UserContributeProject> getContributionByCategory(Long id);

    List<UserContributeProject> getContributionByStatus();

    List<UserContributeProject> getContributionItemsByStatus();

    List<UserContributeProject> getTransportByStatus();

    List<UserContributeProject> getTransportByShipper(Long userId);
}
