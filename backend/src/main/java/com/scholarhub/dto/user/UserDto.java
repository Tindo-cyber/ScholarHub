package com.scholarhub.dto.user;

import com.scholarhub.domain.entity.User;
import com.scholarhub.domain.enums.UserRole;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserDto {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String fullName;
    private UserRole role;
    private String university;
    private String department;
    private String program;
    private String avatarUrl;

    public static UserDto from(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .fullName(user.getFullName())
                .role(user.getRole())
                .university(user.getUniversity())
                .department(user.getDepartment())
                .program(user.getProgram())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }
}
