package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.UserRole;
import java.util.List;
import java.util.Optional;


public interface RoleRepository extends JpaRepository<UserRole, Long> {
    UserRole findByName(String name);

    Optional<UserRole> findById(Long id);
}
