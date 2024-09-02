package com.drive.student.Admin;

import com.drive.student.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/job-applications")
@CrossOrigin(origins = "http://localhost:4200")
public class JopApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @PostMapping("/job")
    public ResponseEntity<JobApplication> createJobApplication(@RequestBody JobApplication jobApplication) {
        JobApplication createdJobApplication = jobApplicationService.createJobApplication(jobApplication);
        return ResponseEntity.ok(createdJobApplication);
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllJobApplications() {
        List<JobApplication> jobApplications = jobApplicationService.getAllJobApplications();
        return ResponseEntity.ok(jobApplications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<JobApplication>> getJobApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationService.getJobApplicationById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateJobApplication(
            @PathVariable Long id, @RequestBody JobApplication jobApplicationDetails) {
        return ResponseEntity.ok(jobApplicationService.updateJobApplication(id, jobApplicationDetails));
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> deleteJobApplication(@PathVariable Long jobId) {
        try {
            jobApplicationService.deleteJobApplication(jobId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }





}
