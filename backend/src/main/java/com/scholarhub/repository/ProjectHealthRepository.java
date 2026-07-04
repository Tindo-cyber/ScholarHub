package com.scholarhub.repository;

import com.scholarhub.domain.entity.ProjectHealth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectHealthRepository extends JpaRepository<ProjectHealth, UUID> {
    Optional<ProjectHealth> findByProjectId(UUID projectId);
}
