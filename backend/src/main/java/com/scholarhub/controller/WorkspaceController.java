package com.scholarhub.controller;

import com.scholarhub.dto.common.ApiResponse;
import com.scholarhub.dto.workspace.WorkspaceDto;
import com.scholarhub.service.WorkspaceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/workspace")
@RequiredArgsConstructor
@Tag(name = "Innovation Workspace")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @GetMapping
    @Operation(summary = "Get innovation workspace for current user")
    public ApiResponse<WorkspaceDto> getWorkspace(@AuthenticationPrincipal UserDetails userDetails) {
        return ApiResponse.ok(workspaceService.getWorkspace(userDetails.getUsername()));
    }
}
