package com.drive.student.Admin;


import com.drive.student.model.Student;
import com.drive.student.model.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepo jobApplicationRepo;

    @Autowired
    private StudentRepository studentRepository;



    // Create or save a new Job Application
    public JobApplication createJobApplication(JobApplication jobApplication) {
        return jobApplicationRepo.save(jobApplication);
    }

    // Get all Job Applications
    public List<JobApplication> getAllJobApplications() {
        return jobApplicationRepo.findAll();
    }

    // Get a Job Application by ID
    public Optional<JobApplication> getJobApplicationById(Long id) {
        return jobApplicationRepo.findById(id);
    }

    // Update an existing Job Application
    public JobApplication updateJobApplication(Long id, JobApplication jobApplicationDetails) {
        JobApplication jobApplication = jobApplicationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Application not found"));

        jobApplication.setCompany_name(jobApplicationDetails.getCompany_name());
        jobApplication.setType(jobApplicationDetails.getType());
        jobApplication.setRole(jobApplicationDetails.getRole());
        jobApplication.setStatus(jobApplicationDetails.getStatus());
        jobApplication.setLocation(jobApplicationDetails.getLocation());
        jobApplication.setPackage_lpa(jobApplicationDetails.getPackage_lpa());
        jobApplication.setDiscreption(jobApplicationDetails.getDiscreption());
        jobApplication.setNo_rounds(jobApplicationDetails.getNo_rounds());
        jobApplication.setApply_before(jobApplicationDetails.getApply_before());

        return jobApplicationRepo.save(jobApplication);
    }

    // Delete a Job Application by ID
    public void deleteJobApplication(Long id) {
        JobApplication jobApplication = jobApplicationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Application not found"));
        jobApplicationRepo.delete(jobApplication);
    }
}

