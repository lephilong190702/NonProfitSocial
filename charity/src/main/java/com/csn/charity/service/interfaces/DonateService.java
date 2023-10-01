package com.csn.charity.service.interfaces;

import com.csn.charity.model.UserContributeProject;

public interface DonateService {
    UserContributeProject donate(Long projectId, UserContributeProject userContributeProject);
}
