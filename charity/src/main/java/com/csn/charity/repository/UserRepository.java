package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.csn.charity.model.User;



public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
}
