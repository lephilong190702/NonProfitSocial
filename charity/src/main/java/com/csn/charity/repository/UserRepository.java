package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.User;
import java.util.List;
import com.csn.charity.model.UserRole;



public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    User findByEmailIgnoreCase(String emailId);
    List<User> findByRoles(UserRole roles);
//    Boolean existsByUserEmail(String email);
}