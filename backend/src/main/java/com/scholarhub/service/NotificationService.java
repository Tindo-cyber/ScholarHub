package com.scholarhub.service;

import com.scholarhub.domain.entity.Notification;
import com.scholarhub.domain.entity.User;
import com.scholarhub.dto.notification.NotificationDto;
import com.scholarhub.repository.NotificationRepository;
import com.scholarhub.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserDetailsServiceImpl userDetailsService;

    public List<NotificationDto> getForUser(String email) {
        User user = userDetailsService.loadEntityByEmail(email);
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(NotificationDto::from)
                .toList();
    }

    @Transactional
    public void markAllRead(String email) {
        User user = userDetailsService.loadEntityByEmail(email);
        notificationRepository.findByUserIdAndIsReadFalse(user.getId())
                .forEach(n -> n.setIsRead(true));
    }
}
