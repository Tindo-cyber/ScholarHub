package com.scholarhub.controller;

import com.scholarhub.dto.common.ApiResponse;
import com.scholarhub.dto.notification.NotificationDto;
import com.scholarhub.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "List notifications for current user")
    public ApiResponse<List<NotificationDto>> getAll(@AuthenticationPrincipal UserDetails userDetails) {
        return ApiResponse.ok(notificationService.getForUser(userDetails.getUsername()));
    }

    @PostMapping("/read-all")
    @Operation(summary = "Mark all notifications as read")
    public ApiResponse<Void> markAllRead(@AuthenticationPrincipal UserDetails userDetails) {
        notificationService.markAllRead(userDetails.getUsername());
        return ApiResponse.ok("All notifications marked as read", null);
    }
}
