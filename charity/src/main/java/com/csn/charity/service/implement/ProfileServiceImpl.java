package com.csn.charity.service.implement;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.csn.charity.dto.ProfileDTO;
import com.csn.charity.model.Profile;
import com.csn.charity.repository.ProfileRepository;
import com.csn.charity.service.interfaces.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private Cloudinary cloudinary;
    @Override
    public Profile update(ProfileDTO profileDTO) {
        Long id = profileDTO.getId();
        Profile p = profileRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy profile với ID: " + id));

        p.setFirstName(profileDTO.getFirstName());
        p.setLastName(profileDTO.getLastName());
        p.setPhone(profileDTO.getPhone());

        MultipartFile file = profileDTO.getFile();
        if (file != null && !file.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(file.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));

                String imageUrl = res.get("secure_url").toString();
                System.out.println("Image URL: " + imageUrl);
                p.setAvatar(imageUrl);

            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }

        return this.profileRepository.save(p);
    }
    @Override
    public Profile get(Long id) {
        return this.profileRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy với ID: " + id));
    }
    
}
