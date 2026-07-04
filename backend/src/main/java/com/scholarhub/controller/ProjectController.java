package com.scholarhub.controller;

import com.scholarhub.dto.common.ApiResponse;
import com.scholarhub.dto.project.ProjectDto;
import com.scholarhub.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@Tag(name = "Projects")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    @Operation(summary = "List all projects")
    public ApiResponse<List<ProjectDto>> getAll() {
        return ApiResponse.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get project by ID")
    public ApiResponse<ProjectDto> getById(@PathVariable UUID id) {
        return ApiResponse.ok(projectService.getProject(id));
    }

    @GetMapping("/search")
    @Operation(summary = "Search projects")
    public ApiResponse<List<ProjectDto>> search(@RequestParam String q) {
        return ApiResponse.ok(projectService.searchProjects(q));
    }

    @GetMapping("/public")
    @Operation(summary = "List public marketplace projects")
    public ApiResponse<List<ProjectDto>> getPublic() {
        return ApiResponse.ok(projectService.getPublicProjects());
    }
}
