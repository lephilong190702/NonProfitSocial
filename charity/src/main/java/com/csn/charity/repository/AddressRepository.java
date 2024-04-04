package com.csn.charity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csn.charity.model.Address;
import com.csn.charity.model.Project;

public interface AddressRepository extends JpaRepository<Address, Long> {
        List<Address> findByProject(Project project);

        List<Address> findByStatus(String status);
}
