package com.csn.charity.service.interfaces;

import com.csn.charity.dto.ProfileDTO;
import com.csn.charity.model.Profile;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ProfileService {
    Profile update(ProfileDTO profileDTO);
    Profile get(Long id);
}
