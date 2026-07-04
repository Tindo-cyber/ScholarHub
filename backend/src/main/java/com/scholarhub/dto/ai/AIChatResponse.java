package com.scholarhub.dto.ai;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class AIChatResponse {
    private UUID conversationId;
    private String reply;
    private String title;
}
