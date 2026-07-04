package com.scholarhub.dto.workspace;

import com.scholarhub.dto.project.ProjectDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class WorkspaceDto {
    private ProjectDto currentProject;
    private List<ProjectDto> projectsUnderReview;
    private List<FeedbackSummaryDto> unreadFeedback;
    private DeadlineDto nextDeadline;
    private List<String> aiSuggestions;
    private long unreadNotifications;
    private Integer innovationScore;
    private Integer portfolioScore;
}
