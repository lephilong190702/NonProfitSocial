// package com.csn.charity.service.implement;

// import java.io.IOException;
// import java.util.Map;
// import java.util.logging.Level;
// import java.util.logging.Logger;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.cloudinary.utils.ObjectUtils;
// import com.csn.charity.model.Profile;
// import com.csn.charity.repository.ProfileRepository;
// import com.csn.charity.service.interfaces.ProfileService;

// @Service
// public class ProfileServiceImpl implements ProfileService {
//     @Autowired
//     private ProfileRepository profileRepository;
//     @Override
//     public Profile update(Long id, Profile profile) {
//         Profile p = this.profileRepository.findById(id)
//         .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy profile với ID: " + id));

//         p.setFirstName(profile.getFirstName());
//         p.setLastName(profile.getLastName());
//         p.setPhone(profile.getPhone());
//         // if (!profile.getFile().isEmpty()) {
//         //     try {
//         //         Map res = this.cloudinary.uploader().upload(n.getFile().getBytes(),
//         //                 ObjectUtils.asMap("resource_type", "auto"));

//         //         news.setImage(res.get("secure_url").toString());

//         //     } catch (IOException ex) {
//         //         Logger.getLogger(NewsServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
//         //     }
//         // }
//     }
    
// }
