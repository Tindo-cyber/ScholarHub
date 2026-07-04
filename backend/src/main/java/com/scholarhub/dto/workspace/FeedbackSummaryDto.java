package com.scholarhub.dto.workspace;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FeedbackSummaryDto {
    private String projectId;
    private String projectName;
    private String supervisor;
    private String message;
    private String date;
}
