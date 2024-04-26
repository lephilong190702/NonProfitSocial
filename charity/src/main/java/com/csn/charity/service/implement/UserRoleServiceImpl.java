package com.csn.charity.service.implement;

import com.csn.charity.model.UserRole;
import com.csn.charity.repository.RoleRepository;
import com.csn.charity.service.interfaces.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserRoleServiceImpl implements UserRoleService {


    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<UserRole> findAllUserRoles() {
        return this.roleRepository.findAll();
    }
}
