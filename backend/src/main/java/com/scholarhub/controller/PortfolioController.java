package com.scholarhub.controller;

import com.scholarhub.dto.common.ApiResponse;
import com.scholarhub.dto.portfolio.PortfolioDto;
import com.scholarhub.service.PortfolioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/portfolio")
@RequiredArgsConstructor
@Tag(name = "Portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping
    @Operation(summary = "Get portfolio for current user")
    public ApiResponse<PortfolioDto> get(@AuthenticationPrincipal UserDetails userDetails) {
        return ApiResponse.ok(portfolioService.getForUser(userDetails.getUsername()));
    }
}
