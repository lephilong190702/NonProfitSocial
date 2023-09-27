package com.csn.charity.service.interfaces;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.csn.charity.dto.UserDTO;
import com.csn.charity.model.User;

public interface UserService extends UserDetailsService {
    String addUser(UserDTO userDto);
    User findUserByUsername(String username);
    User get(Long id);
    List<UserDTO> findAllUsers();   
    void activateAccount(Long id);
    void disableAccount(Long id);
    void delete(Long id);
}
