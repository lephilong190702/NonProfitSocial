package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.UserContributeProject;

public interface DonateService {
    UserContributeProject donate(Long projectId, UserContributeProject userContributeProject);

    List<UserContributeProject> getAllContribute();

    List<UserContributeProject> getContributionByProject(Long id);
}
