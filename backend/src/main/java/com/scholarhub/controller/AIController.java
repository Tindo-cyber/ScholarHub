package com.scholarhub.controller;

import com.scholarhub.ai.AIService;
import com.scholarhub.dto.ai.AIChatRequest;
import com.scholarhub.dto.ai.AIChatResponse;
import com.scholarhub.dto.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@Tag(name = "Scholar AI Mentor")
public class AIController {

    private final AIService aiService;

    @PostMapping("/chat")
    @Operation(summary = "Chat with Scholar AI mentor")
    public ApiResponse<AIChatResponse> chat(
            @Valid @RequestBody AIChatRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ApiResponse.ok(aiService.chat(request, userDetails.getUsername()));
    }
}
