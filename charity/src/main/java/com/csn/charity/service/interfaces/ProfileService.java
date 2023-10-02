package com.csn.charity.service.interfaces;

import com.csn.charity.dto.ProfileDTO;
import com.csn.charity.model.Profile;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ProfileService {
    Profile update(Map<String, String> params, MultipartFile avatar);
    Profile get(Long id);
}
