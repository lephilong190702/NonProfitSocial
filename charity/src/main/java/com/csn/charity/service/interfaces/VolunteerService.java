package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.dto.VolunteerRequestDTO;
import com.csn.charity.model.Address;
import com.csn.charity.model.UserVolunteerProject;

public interface VolunteerService {
    void saveVolunteer(VolunteerRequestDTO requestDTO);

    List<UserVolunteerProject> getAll();

    void acceptVolunteer(Long volunteerId);

    List<UserVolunteerProject> getPendingVolunteer();
}
