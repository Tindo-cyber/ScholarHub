package com.scholarhub.controller;

import com.scholarhub.dto.auth.AuthResponse;
import com.scholarhub.dto.auth.LoginRequest;
import com.scholarhub.dto.auth.RegisterRequest;
import com.scholarhub.dto.common.ApiResponse;
import com.scholarhub.dto.user.UserDto;
import com.scholarhub.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.ok(authService.register(request));
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.ok(authService.login(request));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user")
    public ApiResponse<UserDto> me(@AuthenticationPrincipal UserDetails userDetails) {
        return ApiResponse.ok(authService.getCurrentUser(userDetails.getUsername()));
    }
}
