package com.scholarhub.dto.portfolio;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PortfolioDto {
    private Integer score;
    private Boolean isPublic;
    private String headline;
    private String summary;
    private List<SkillDto> skills;
    private List<CertificateDto> certificates;
    private Integer projectCount;
    private Integer deployedCount;
}
