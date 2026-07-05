package com.scholarhub.service;

import com.scholarhub.domain.entity.Portfolio;
import com.scholarhub.domain.entity.User;
import com.scholarhub.domain.enums.ProjectStatus;
import com.scholarhub.dto.portfolio.CertificateDto;
import com.scholarhub.dto.portfolio.PortfolioDto;
import com.scholarhub.dto.portfolio.SkillDto;
import com.scholarhub.repository.CertificateRepository;
import com.scholarhub.repository.PortfolioRepository;
import com.scholarhub.repository.ProjectRepository;
import com.scholarhub.repository.SkillRepository;
import com.scholarhub.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final SkillRepository skillRepository;
    private final CertificateRepository certificateRepository;
    private final ProjectRepository projectRepository;
    private final UserDetailsServiceImpl userDetailsService;

    public PortfolioDto getForUser(String email) {
        User user = userDetailsService.loadEntityByEmail(email);
        Portfolio portfolio = portfolioRepository.findByUserId(user.getId()).orElse(null);

        var skills = skillRepository.findByUserId(user.getId()).stream()
                .map(s -> SkillDto.builder().name(s.getName()).category(s.getCategory()).level(s.getLevel()).build())
                .toList();

        var certificates = certificateRepository.findByUserId(user.getId()).stream()
                .map(c -> CertificateDto.builder()
                        .name(c.getName())
                        .issuer(c.getIssuer())
                        .date(c.getIssuedDate().toString())
                        .build())
                .toList();

        long projectCount = projectRepository.countByStudentId(user.getId());
        long deployedCount = projectRepository.countByStudentIdAndStatus(user.getId(), ProjectStatus.DEPLOYED);

        return PortfolioDto.builder()
                .score(portfolio != null ? portfolio.getScore() : 0)
                .isPublic(portfolio != null && portfolio.getIsPublic())
                .headline(portfolio != null ? portfolio.getHeadline() : null)
                .summary(portfolio != null ? portfolio.getSummary() : null)
                .skills(skills)
                .certificates(certificates)
                .projectCount((int) projectCount)
                .deployedCount((int) deployedCount)
                .build();
    }
}
