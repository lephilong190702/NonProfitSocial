package com.csn.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

}
