package com.csn.charity.service.implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.dto.VolunteerRequestDTO;
import com.csn.charity.model.Project;
import com.csn.charity.model.Skill;
import com.csn.charity.model.User;
import com.csn.charity.model.UserVolunteerProject;
import com.csn.charity.repository.ProjectRepository;
import com.csn.charity.repository.SkillReposiroty;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.repository.VolunteerRepository;
import com.csn.charity.service.interfaces.VolunteerService;

@Service
public class VolunteerServiceImpl implements VolunteerService {
    @Autowired
    private VolunteerRepository volunteerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private SkillReposiroty skillReposiroty;

    @Override
    public void saveVolunteer(VolunteerRequestDTO requestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User user = this.userRepository.findByUsername(username);
            if (user != null) {
                Project project = this.projectRepository.findById(requestDTO.getProjectId())
                        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy dự án"));
                if (project != null) {
                    UserVolunteerProject userVolunteerProject = new UserVolunteerProject();
                    userVolunteerProject.setRegisterDate(new Date());
                    userVolunteerProject.setUser(user);
                    userVolunteerProject.setProject(project);
                    userVolunteerProject.setStartDate(requestDTO.getStartDate());
                    userVolunteerProject.setEndDate(requestDTO.getEndDate());
                    userVolunteerProject.setDescription(requestDTO.getDescription());

                    List<Skill> skills = new ArrayList<>();
                    if (requestDTO.getSkills() != null && !requestDTO.getSkills().isEmpty()) {
                        requestDTO.getSkills().forEach(skillId -> {
                            Optional<Skill> skillOptional = this.skillReposiroty.findById(skillId);
                            if (skillOptional.isPresent()) {
                                Skill skill = skillOptional.get();
                                skills.add(skill);
                            } else {
                                throw new IllegalArgumentException("Không tìm thấy kỹ năng có ID: " + skillId);
                            }
                        });
                    }
                    userVolunteerProject.setSkills(skills);

                    this.volunteerRepository.save(userVolunteerProject);
                } else {
                    throw new RuntimeException("Dự án không tồn tại");
                }
            } else {
                throw new RuntimeException("Người dùng không tồn tại");
            }
        } else {
            throw new RuntimeException("Người dùng chưa đăng nhập");
        }
    }

    @Override
    public List<UserVolunteerProject> getAll() {
        return this.volunteerRepository.findAll();
    }

}
