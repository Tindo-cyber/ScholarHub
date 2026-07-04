package com.scholarhub.dto.project;

import com.scholarhub.domain.entity.Project;
import com.scholarhub.domain.enums.ProjectPhase;
import com.scholarhub.domain.enums.ProjectStatus;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ProjectDto {
    private UUID id;
    private String title;
    private String description;
    private ProjectStatus status;
    private ProjectPhase phase;
    private Integer progress;
    private UUID studentId;
    private String studentName;
    private UUID supervisorId;
    private String supervisorName;
    private String department;
    private List<String> technologies;
    private String imageUrl;
    private String githubUrl;
    private String deploymentUrl;
    private LocalDate deadline;
    private Boolean isPublic;
    private Integer innovationScore;
    private ProjectHealthDto health;
    private Instant createdAt;
    private Instant updatedAt;

    public static ProjectDto from(Project project) {
        return ProjectDto.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .status(project.getStatus())
                .phase(project.getPhase())
                .progress(project.getProgress())
                .studentId(project.getStudent().getId())
                .studentName(project.getStudent().getFullName())
                .supervisorId(project.getSupervisor() != null ? project.getSupervisor().getId() : null)
                .supervisorName(project.getSupervisor() != null ? project.getSupervisor().getFullName() : null)
                .department(project.getDepartment())
                .technologies(project.getTechnologies())
                .imageUrl(project.getImageUrl())
                .githubUrl(project.getGithubUrl())
                .deploymentUrl(project.getDeploymentUrl())
                .deadline(project.getDeadline())
                .isPublic(project.getIsPublic())
                .innovationScore(project.getInnovationScore())
                .health(project.getHealth() != null ? ProjectHealthDto.from(project.getHealth()) : null)
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
