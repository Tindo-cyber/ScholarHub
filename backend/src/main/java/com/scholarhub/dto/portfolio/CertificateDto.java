package com.scholarhub.dto.portfolio;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CertificateDto {
    private String name;
    private String issuer;
    private String date;
}
