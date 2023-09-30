package com.csn.charity.service.interfaces;

import com.csn.charity.dto.ProfileDTO;
import com.csn.charity.model.Profile;

public interface ProfileService {
    Profile update(ProfileDTO profileDTO);
    Profile get(Long id);
}
