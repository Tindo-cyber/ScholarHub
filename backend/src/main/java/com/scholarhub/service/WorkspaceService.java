package com.scholarhub.service;

import com.scholarhub.domain.entity.Project;
import com.scholarhub.domain.entity.User;
import com.scholarhub.dto.project.ProjectDto;
import com.scholarhub.dto.workspace.DeadlineDto;
import com.scholarhub.dto.workspace.FeedbackSummaryDto;
import com.scholarhub.dto.workspace.WorkspaceDto;
import com.scholarhub.repository.NotificationRepository;
import com.scholarhub.repository.PortfolioRepository;
import com.scholarhub.repository.ProjectRepository;
import com.scholarhub.repository.SupervisorFeedbackRepository;
import com.scholarhub.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WorkspaceService {

    private final ProjectRepository projectRepository;
    private final SupervisorFeedbackRepository feedbackRepository;
    private final NotificationRepository notificationRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserDetailsServiceImpl userDetailsService;

    private static final List<String> AI_SUGGESTIONS = List.of(
            "Review your documentation completeness",
            "Generate Chapter 1 outline",
            "Prepare viva questions",
            "Improve your project abstract",
            "Check deployment readiness"
    );

    public WorkspaceDto getWorkspace(String email) {
        User user = userDetailsService.loadEntityByEmail(email);
        UUID userId = user.getId();

        List<Project> studentProjects = projectRepository.findByStudentId(userId);

        Project currentProject = studentProjects.stream()
                .filter(p -> p.getStatus() != com.scholarhub.domain.enums.ProjectStatus.ARCHIVED
                        && p.getStatus() != com.scholarhub.domain.enums.ProjectStatus.DEPLOYED)
                .max(Comparator.comparing(Project::getUpdatedAt))
                .orElse(studentProjects.isEmpty() ? null : studentProjects.getFirst());

        List<ProjectDto> underReview = studentProjects.stream()
                .filter(p -> p.getStatus() == com.scholarhub.domain.enums.ProjectStatus.IN_REVIEW)
                .map(ProjectDto::from)
                .toList();

        List<FeedbackSummaryDto> unreadFeedback = feedbackRepository
                .findByProjectStudentIdAndIsReadFalse(userId)
                .stream()
                .map(f -> FeedbackSummaryDto.builder()
                        .projectId(f.getProject().getId().toString())
                        .projectName(f.getProject().getTitle())
                        .supervisor(f.getSupervisor().getFullName())
                        .message(f.getMessage())
                        .date(f.getCreatedAt().toString())
                        .build())
                .toList();

        DeadlineDto nextDeadline = studentProjects.stream()
                .filter(p -> p.getDeadline() != null && !p.getDeadline().isBefore(LocalDate.now()))
                .min(Comparator.comparing(Project::getDeadline))
                .map(p -> DeadlineDto.builder()
                        .projectId(p.getId().toString())
                        .projectName(p.getTitle())
                        .daysLeft((int) ChronoUnit.DAYS.between(LocalDate.now(), p.getDeadline()))
                        .build())
                .orElse(null);

        Integer portfolioScore = portfolioRepository.findByUserId(userId)
                .map(p -> p.getScore())
                .orElse(0);

        Integer innovationScore = studentProjects.stream()
                .mapToInt(p -> p.getInnovationScore() != null ? p.getInnovationScore() : 0)
                .max()
                .orElse(0);

        return WorkspaceDto.builder()
                .currentProject(currentProject != null ? ProjectDto.from(currentProject) : null)
                .projectsUnderReview(underReview)
                .unreadFeedback(unreadFeedback)
                .nextDeadline(nextDeadline)
                .aiSuggestions(AI_SUGGESTIONS)
                .unreadNotifications(notificationRepository.countByUserIdAndIsReadFalse(userId))
                .innovationScore(innovationScore)
                .portfolioScore(portfolioScore)
                .build();
    }
}
