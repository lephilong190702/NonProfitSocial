package com.csn.charity.service.implement;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.csn.charity.model.*;
import com.csn.charity.repository.ConfirmationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
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
    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    MailServiceImpl mailService;

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
        user.setEnabled(false);
        System.out.println("STATUS" + user.getStatus());
        if (userDto.getPassword() != null)
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        else
            System.out.println("LỖI!!!!!!!!");
        UserRole role = roleRepository.findByName("ROLE_USER");
        user.setRoles(Arrays.asList(role));

        Profile profile = new Profile();
        profile.setUser(user);
        profile.setAvatar("https://res.cloudinary.com/dvgpizkep/image/upload/v1714564338/s2rav4aobxn8dzwsrait.jpg");

        user.setProfile(profile);

        User savedUser = userRepository.save(user);

        ConfirmationToken confirmationToken = new ConfirmationToken(savedUser);

        confirmationTokenRepository.save(confirmationToken);

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setText("To confirm your account, please click here : "
                    + "https://nonprofit.southeastasia.cloudapp.azure.com/api/confirm-account?token=" + confirmationToken.getConfirmationToken());
            mailService.sendMailRegister(mailMessage);
        } catch (MailException e) {
            System.out.println("Error sending email: " + e.getMessage());
        }

        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());
        return savedUser.getId();
    }

    @Override
    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if (token != null) {
            User user = userRepository.findByEmailIgnoreCase(token.getUser().getEmail());
            user.setEnabled(true);
            userRepository.save(user);
            return ResponseEntity.ok("Email verified successfully!");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }

    @Override
    public User findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public List<User> findAllUsers() {
        return this.userRepository.findAll();
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
        if (user == null) {
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
        mimeMessageHelper.setText(
                """
                        <div>
                          <a href="https://nonprofit.southeastasia.cloudapp.azure.com/resetPassword?email=%s" target="_blank">Nhấn link để đặt lại mật khẩu</a>
                        </div>
                        """
                        .formatted(email),
                true);
        javaMailSender.send(mimeMessage);
    }

    @Override
    public String setPassword(String email, String newPassword) {
        User user = this.userRepository.findByEmail(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        this.userRepository.save(user);

        return "Đặt mật khẩu mới thành công!!";
    }

    public void updateUserRole(Long userId, Long roleId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<UserRole> roleOptional = roleRepository.findById(roleId);

        if (userOptional.isPresent() && roleOptional.isPresent()) {
            User user = userOptional.get();
            UserRole role = roleOptional.get();

            // Remove existing role
            user.getRoles().clear();

            // Add new role
            user.getRoles().add(role);

            // Save user
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public boolean isAdmin(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_ADMIN"));
    }

    @Override
    public boolean isEmployee(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user.getRoles().stream().anyMatch(r -> r.getName().equals("ROLE_EMPLOYEE"));
    }

}