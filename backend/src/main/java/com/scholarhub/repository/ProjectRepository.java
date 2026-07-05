package com.scholarhub.repository;

import com.scholarhub.domain.entity.Project;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.scholarhub.domain.enums.ProjectPhase;
import com.scholarhub.domain.enums.ProjectStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    @EntityGraph(attributePaths = {"student", "supervisor", "health"})
    @Query("SELECT p FROM Project p")
    List<Project> findAllWithDetails();

    @EntityGraph(attributePaths = {"student", "supervisor", "health"})
    @Query("SELECT p FROM Project p WHERE p.id = :id")
    Optional<Project> findByIdWithDetails(@Param("id") UUID id);

    @EntityGraph(attributePaths = {"student", "supervisor", "health"})
    List<Project> findByStudentId(UUID studentId);

    @EntityGraph(attributePaths = {"student", "supervisor", "health"})
    List<Project> findBySupervisorId(UUID supervisorId);

    @EntityGraph(attributePaths = {"student", "supervisor", "health"})
    List<Project> findByIsPublicTrue();

    @EntityGraph(attributePaths = {"student", "supervisor", "health"})
    @Query("SELECT p FROM Project p WHERE p.student.id = :studentId AND p.status = :status")
    List<Project> findByStudentIdAndStatus(@Param("studentId") UUID studentId, @Param("status") ProjectStatus status);

    @EntityGraph(attributePaths = {"student", "supervisor", "health"})
    @Query("""
        SELECT p FROM Project p
        WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))
        """)
    List<Project> searchByText(@Param("query") String query);

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

    long countByStudentIdAndStatus(UUID studentId, ProjectStatus status);
}
