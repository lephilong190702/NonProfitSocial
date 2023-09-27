package com.csn.charity.service.interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.csn.charity.dto.UserDTO;
import com.csn.charity.model.User;

public interface UserService extends UserDetailsService {
    String addUser(UserDTO userDto);

    Optional<User> findUserByUsername(String username);

    List<UserDTO> findAllUsers();
}
