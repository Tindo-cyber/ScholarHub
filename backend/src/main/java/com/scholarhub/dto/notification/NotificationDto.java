package com.scholarhub.dto.notification;

import com.scholarhub.domain.entity.Notification;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class NotificationDto {
    private UUID id;
    private String type;
    private String title;
    private String message;
    private boolean read;
    private Instant date;

    public static NotificationDto from(Notification n) {
        return NotificationDto.builder()
                .id(n.getId())
                .type(n.getType())
                .title(n.getTitle())
                .message(n.getMessage())
                .read(n.getIsRead())
                .date(n.getCreatedAt())
                .build();
    }
}
