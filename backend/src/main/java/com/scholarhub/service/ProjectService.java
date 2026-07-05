package com.scholarhub.service;

import com.scholarhub.domain.entity.Project;
import com.scholarhub.domain.enums.ProjectStatus;
import com.scholarhub.dto.project.ProjectDto;
import com.scholarhub.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAllWithDetails().stream().map(ProjectDto::from).toList();
    }

    public List<ProjectDto> getProjectsByStudent(UUID studentId) {
        return projectRepository.findByStudentId(studentId).stream().map(ProjectDto::from).toList();
    }

    public List<ProjectDto> getProjectsBySupervisor(UUID supervisorId) {
        return projectRepository.findBySupervisorId(supervisorId).stream().map(ProjectDto::from).toList();
    }

    public ProjectDto getProject(UUID id) {
        Project project = projectRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
        return ProjectDto.from(project);
    }

    public List<ProjectDto> searchProjects(String query) {
        return projectRepository.searchByText(query).stream().map(ProjectDto::from).toList();
    }

    public List<ProjectDto> getPublicProjects() {
        return projectRepository.findByIsPublicTrue().stream().map(ProjectDto::from).toList();
    }

    public List<ProjectDto> getProjectsUnderReview(UUID studentId) {
        return projectRepository.findByStudentIdAndStatus(studentId, ProjectStatus.IN_REVIEW)
                .stream().map(ProjectDto::from).toList();
    }
}
