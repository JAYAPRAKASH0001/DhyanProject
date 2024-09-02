package com.drive.student.Application;

import java.util.List;

import com.drive.student.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJobApplicationId(Long jobApplicationId);
    List<Application> findByStudentId(Long studentId);

}