package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.UserRole;

public interface RoleRepository extends JpaRepository<UserRole, Long> {
    UserRole findByName(String name);
}
