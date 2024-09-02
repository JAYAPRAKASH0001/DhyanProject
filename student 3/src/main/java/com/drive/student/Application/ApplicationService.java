package com.drive.student.Application;

import com.drive.student.model.Student;
import com.drive.student.model.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private StudentRepository studentRepository;
    public List<Application> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobApplicationId(jobId);
    }

    public List<Application> getApplicationsByStudentId(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    public Application saveApplication(Application application) {
        return applicationRepository.save(application);
    }

    public void updateApplicationStatus(Long applicationId, Application.ApplicationStatus status) {
        Application application = applicationRepository.findById(applicationId).orElseThrow();
        application.setStatus(status);
        applicationRepository.save(application);
    }

    public void updateApplicationStage(Long applicationId, String stage,int is_stage) {
        Application application = applicationRepository.findById(applicationId).orElseThrow();
        application.setStage(stage);
        application.setIs_stage(is_stage);
        applicationRepository.save(application);
    }

    public Long getStudentIdByEmail(String email) {
        Optional<Student> student = studentRepository.findByEmail(email);
        if (student.isPresent()) {
            return student.get().getId();
        } else {
            throw new RuntimeException("Student not found with email: " + email);
        }
    }
}
