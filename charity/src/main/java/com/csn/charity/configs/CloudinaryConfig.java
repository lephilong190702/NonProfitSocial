package com.csn.charity.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {
    @Bean
    Cloudinary getCloudinary(){
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dvgpizkep",
            "api_key", "966854718195463",
            "api_secret", "OC5koTFjGtt4tPZ-VqqsLHWb6ME",
            "secure", true
        ));
        return cloudinary;
    }
}
