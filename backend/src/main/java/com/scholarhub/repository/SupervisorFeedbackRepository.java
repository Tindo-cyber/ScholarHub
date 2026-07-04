package com.scholarhub.repository;

import com.scholarhub.domain.entity.SupervisorFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SupervisorFeedbackRepository extends JpaRepository<SupervisorFeedback, UUID> {
    List<SupervisorFeedback> findByProjectIdOrderByCreatedAtDesc(UUID projectId);
    List<SupervisorFeedback> findByProjectStudentIdAndIsReadFalse(UUID studentId);
}
