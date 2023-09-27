package com.csn.charity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
