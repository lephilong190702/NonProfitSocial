package com.csn.charity.service.implement;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.csn.charity.dto.ProfileDTO;
import com.csn.charity.model.Profile;
import com.csn.charity.model.User;
import com.csn.charity.repository.ProfileRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Profile update(Map<String, String> params, MultipartFile avatar) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }
//
//        String username = authentication.getName();
//        System.out.println(username);
//        User user = userRepository.findByUsername(username);
//        if (user == null) {
//            throw new NoSuchElementException("Không tìm thấy người dùng");
//        }
//
//        Long id = user.getId();
//        Profile p = profileRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy profile với ID: " + id));
//
//        p.setFirstName(profileDTO.getFirstName());
//        p.setLastName(profileDTO.getLastName());
//        p.setPhone(profileDTO.getPhone());
//
//         MultipartFile file = profileDTO.getFile();
//         if (file != null && !file.isEmpty()) {
//             try {
//                 Map res = this.cloudinary.uploader().upload(file.getBytes(),
//                         ObjectUtils.asMap("resource_type", "auto"));
//
//                 String imageUrl = res.get("secure_url").toString();
//                 System.out.println("Image URL: " + imageUrl);
//                 p.setAvatar(imageUrl);
//
//             } catch (IOException ex) {
//                 ex.printStackTrace();
//             }
//         }
//
//        return this.profileRepository.save(p);
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Profile u = new Profile();
        u.setPhone(params.get("phone"));
        u.setFirstName(params.get("firstName"));
        u.setLastName(params.get("lastName"));

        if (!avatar.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(avatar.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                u.setAvatar(res.get("secure_url").toString());
            } catch (IOException ex) {
                Logger.getLogger(ProfileService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        this.profileRepository.save(u);
        return u;
    }
    @Override
    public Profile get(Long id) {
        return this.profileRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy với ID: " + id));
    }
    
}
