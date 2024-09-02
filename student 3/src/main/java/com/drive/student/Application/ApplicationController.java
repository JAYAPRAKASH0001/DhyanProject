package com.drive.student.Application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:4200")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/job/{jobId}")
    public List<ApplicantDTO> getApplicationsByJobId(@PathVariable Long jobId) {
        // Fetch the list of applications for the given jobId
        List<Application> applications = applicationService.getApplicationsByJobId(jobId);

        // Map the list of Application entities to a list of ApplicantDTOs
        return applications.stream()
                .map(app -> new ApplicantDTO(
                        app.getId(), // Include the ID
                        app.getStudent().getFirstName() + " " + app.getStudent().getLastName(),
                        app.getStudent().getEmail(),
                        app.getStatus(),
                        app.getStage()))
                .collect(Collectors.toList());
    }


    @GetMapping("/student/{studentId}")
    public List<Application> getApplicationsByStudentId(@PathVariable Long studentId) {
        return applicationService.getApplicationsByStudentId(studentId);
    }

    @PostMapping("/apply")
    public Application applyForJob(@RequestBody Application application) {
        return applicationService.saveApplication(application);
    }


    @PutMapping("/{id}/status")
    public void updateApplicationStatus(@PathVariable Long id, @RequestParam Application.ApplicationStatus status) {
        applicationService.updateApplicationStatus(id, status);
    }

    @PutMapping("/{id}/stage")
    public void updateApplicationStage(@PathVariable Long id, @RequestParam String stage,@RequestParam int is_stage) {
        applicationService.updateApplicationStage(id, stage,is_stage);
    }
    @GetMapping("/student/email/{email}")
    public List<Application> getApplicationsByStudentEmail(@PathVariable String email) {
        Long studentId = applicationService.getStudentIdByEmail(email);
        return applicationService.getApplicationsByStudentId(studentId);
    }

}
