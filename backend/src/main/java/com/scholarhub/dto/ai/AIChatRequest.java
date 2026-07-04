package com.scholarhub.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class AIChatRequest {
    private UUID conversationId;
    private UUID projectId;

    @NotBlank
    private String message;

    private String context;
}
