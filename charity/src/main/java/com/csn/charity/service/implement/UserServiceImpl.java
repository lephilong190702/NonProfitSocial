package com.csn.charity.service.implement;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.UserDTO;
import com.csn.charity.model.AuthenticationType;
import com.csn.charity.model.Profile;
import com.csn.charity.model.User;
import com.csn.charity.model.UserRole;
import com.csn.charity.repository.RoleRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.UserService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private JavaMailSender javaMailSender;

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
    public Long addUser(UserDTO userDto) {
        User user = new User();
        user.setId(userDto.getId());
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
        
        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    @Override
    public User findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public List<User> findAllUsers() {
        return this.userRepository.findAll();
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

    @Override
    public User findUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public void registerOAuthUser(String email, AuthenticationType type) {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            User nUser = new User();
            nUser.setEmail(email);
            nUser.setAuthType(type);
            nUser.setStatus(true);

            Profile profile = new Profile();
            nUser.setProfile(profile);

            this.userRepository.save(nUser);
        }
    }

    @Override
    public String forgotPassword(String email) {
        User user = this.userRepository.findByEmail(email);
        try {
            sendForgotPassword(email);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return "Kiểm tra email để xác nhận đặt lại mật khẩu!";
    }

  
    public void sendForgotPassword(String email) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Reset Password");
        mimeMessageHelper.setText("""
        <div>
          <a href="http://localhost:9090/set-password?email=%s" target="_blank">Nhấn link để đặt lại mật khẩu</a>
        </div>
        """.formatted(email), true);
        javaMailSender.send(mimeMessage);
    }

    @Override
    public String setPassword(String email, String newPassword) {
        User user = this.userRepository.findByEmail(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        this.userRepository.save(user);

        return "Đặt mật khẩu mới thành công!!";
    }

    

}
