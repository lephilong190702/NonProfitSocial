package com.csn.charity.service.implement;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.UserDTO;
import com.csn.charity.model.Profile;
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
        User user = userRepository.findByUsername(username);
        boolean enabled = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;

        if (!user.getStatus()) {
            throw new DisabledException("Tài khoản đã bị khóa");
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), enabled, accountNonExpired,
                credentialsNonExpired, accountNonLocked, authorities);
    }

    @Override
    public String addUser(UserDTO userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setStatus(true);
        System.out.println("STATUS" + user.getStatus());
        if (userDto.getPassword() != null)
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        else
            System.out.println("LỖI!!!!!!!!");
        UserRole role = roleRepository.findByName("ROLE_USER");
        user.setRoles(Arrays.asList(role));

        Profile profile = new Profile();
        profile.setUser(user);

        user.setProfile(profile);
        userRepository.save(user);
        return "User Added Successfully";
    }

    @Override
    public User findUserByUsername(String username) {
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
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setStatus(user.getStatus());
        return userDto;
    }

    @Override
    public void activateAccount(Long id) {
        User user = this.userRepository.findById(id).get();
        if (user != null) {
            user.setStatus(true);
            this.userRepository.save(user);
        }
    }

    @Override
    public void disableAccount(Long id) {
        User user = this.userRepository.findById(id).get();
        if (user != null) {
            user.setStatus(false);
            this.userRepository.save(user);
        }
    }

    @Override
    public void delete(Long id) {

        User user = this.userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án với ID: " + id));
        user.getRoles().clear();
        this.userRepository.save(user);
        this.userRepository.delete(user);
    }

    @Override
    public User get(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng với ID: " + id));
    }

}
