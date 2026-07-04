package com.scholarhub.repository;

import com.scholarhub.domain.entity.Project;
import com.scholarhub.domain.enums.ProjectPhase;
import com.scholarhub.domain.enums.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findByStudentId(UUID studentId);

    List<Project> findBySupervisorId(UUID supervisorId);

    List<Project> findByStatus(ProjectStatus status);

    List<Project> findByIsPublicTrue();

    @Query("SELECT p FROM Project p WHERE p.student.id = :studentId AND p.status = :status")
    List<Project> findByStudentIdAndStatus(@Param("studentId") UUID studentId, @Param("status") ProjectStatus status);

    @Query("""
        SELECT p FROM Project p
        WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))
           OR :tech MEMBER OF p.technologies
        """)
    List<Project> searchProjects(@Param("query") String query, @Param("tech") String tech);

    @Query("""
        SELECT p FROM Project p
        WHERE (:department IS NULL OR p.department = :department)
          AND (:phase IS NULL OR p.phase = :phase)
          AND (:status IS NULL OR p.status = :status)
        """)
    List<Project> findWithFilters(
            @Param("department") String department,
            @Param("phase") ProjectPhase phase,
            @Param("status") ProjectStatus status
    );

    long countByStudentId(UUID studentId);
}
