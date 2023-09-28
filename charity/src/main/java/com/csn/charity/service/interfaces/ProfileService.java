package com.csn.charity.service.interfaces;

import com.csn.charity.model.Profile;

public interface ProfileService {
    Profile update(Long id, Profile profile);
    Profile get(Long id);
}
