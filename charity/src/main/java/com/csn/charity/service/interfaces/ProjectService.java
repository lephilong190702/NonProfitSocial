package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.ProjectFeedback;
import com.csn.charity.model.UserContributeProject;
import org.springframework.web.multipart.MultipartFile;

import com.csn.charity.dto.ProjectDTO;
import com.csn.charity.model.Project;
import com.csn.charity.model.ProjectImage;

public interface ProjectService {
    List<Project> getAll();

    Project get(Long id);

    Project add(Project project);

    Project update(Long id, Project project);

    void delete(Long id);

    List<Project> findByName(String name);

    Long countProjectByCategory(Long categoryId);

    List<Project> getProjectsByCategory(Long categoryId);

    List<Project> search(String kw);

    List<Project> getPendingProject();

    List<ProjectImage> getImagesByProject(Long id);

    Project sendProject(ProjectDTO projectDTO, List<MultipartFile> files);

    void acceptProject(Long projectId);

    void denyProject(Long projectId);

    ProjectFeedback feedbackProject(Long projectId, ProjectFeedback projectFeedback);

    List <ProjectFeedback> getPendingFeedback();

    ProjectFeedback getFeedback(Long id);

    void acceptFeedback(Long projectId);

    void denyFeedback(Long projectId);


}