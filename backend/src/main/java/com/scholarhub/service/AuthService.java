package com.scholarhub.service;

import com.scholarhub.domain.entity.User;
import com.scholarhub.domain.enums.UserRole;
import com.scholarhub.dto.auth.AuthResponse;
import com.scholarhub.dto.auth.LoginRequest;
import com.scholarhub.dto.auth.RegisterRequest;
import com.scholarhub.dto.user.UserDto;
import com.scholarhub.repository.UserRepository;
import com.scholarhub.security.JwtService;
import com.scholarhub.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(request.getRole() != null ? request.getRole() : UserRole.STUDENT)
                .university(request.getUniversity())
                .department(request.getDepartment())
                .program(request.getProgram())
                .build();

        user = userRepository.save(user);
        return buildAuthResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = userDetailsService.loadEntityByEmail(request.getEmail());
        return buildAuthResponse(user);
    }

    public UserDto getCurrentUser(String email) {
        User user = userDetailsService.loadEntityByEmail(email);
        return UserDto.from(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        var userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        return AuthResponse.builder()
                .accessToken(jwtService.generateToken(userDetails, user.getId()))
                .refreshToken(jwtService.generateRefreshToken(userDetails, user.getId()))
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .build();
    }
}
