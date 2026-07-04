package com.scholarhub.dto.project;

import com.scholarhub.domain.entity.ProjectHealth;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectHealthDto {
    private Integer documentation;
    private Integer testing;
    private Integer codeQuality;
    private Integer deployment;
    private Integer presentation;
    private Integer research;
    private Integer security;
    private Integer overallScore;

    public static ProjectHealthDto from(ProjectHealth health) {
        return ProjectHealthDto.builder()
                .documentation(health.getDocumentation())
                .testing(health.getTesting())
                .codeQuality(health.getCodeQuality())
                .deployment(health.getDeployment())
                .presentation(health.getPresentation())
                .research(health.getResearch())
                .security(health.getSecurity())
                .overallScore(health.getOverallScore())
                .build();
    }
}
