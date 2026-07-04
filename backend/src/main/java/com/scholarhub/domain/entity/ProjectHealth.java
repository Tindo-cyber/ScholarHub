package com.scholarhub.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "project_health")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectHealth {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false, unique = true)
    private Project project;

    @Column(nullable = false)
    @Builder.Default
    private Integer documentation = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer testing = 0;

    @Column(name = "code_quality", nullable = false)
    @Builder.Default
    private Integer codeQuality = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer deployment = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer presentation = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer research = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer security = 0;

    @Column(name = "overall_score", nullable = false)
    @Builder.Default
    private Integer overallScore = 0;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    public void recalculateOverall() {
        this.overallScore = (documentation + testing + codeQuality + deployment
                + presentation + research + security) / 7;
    }
}
