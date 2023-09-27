package com.csn.charity.service.implement;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.UserDTO;
import com.csn.charity.dto.UserInfoDetails;
import com.csn.charity.model.User;
import com.csn.charity.model.UserRole;
import com.csn.charity.repository.RoleRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.UserService;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userDetail = userRepository.findByUsername(username);

        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    @Override
    public String addUser(UserDTO userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        UserRole role = roleRepository.findByName("ROLE_ADMIN");
        user.setRoles(Arrays.asList(role));
        userRepository.save(user);
        return "User Added Successfully";
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public List<UserDTO> findAllUsers() {
        List<User> users = this.userRepository.findAll();
        return users.stream()
                .map((user) -> mapToUserDto(user))
                .collect(Collectors.toList());
    }

    private UserDTO mapToUserDto(User user) {
        UserDTO userDto = new UserDTO();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

}
