package com.scholarhub.dto.workspace;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeadlineDto {
    private String projectId;
    private String projectName;
    private int daysLeft;
}
