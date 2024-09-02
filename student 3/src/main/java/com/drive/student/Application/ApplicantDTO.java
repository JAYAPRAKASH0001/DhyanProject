package com.drive.student.Application;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApplicantDTO {
    private Long id;  // Ensure `id` is included
    private String studentName;
    private String studentEmail;
    private Application.ApplicationStatus status;
    private String stage;

    // Constructor to initialize fields
    public ApplicantDTO(Long id, String studentName, String studentEmail, Application.ApplicationStatus status, String stage) {
        this.id = id;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.status = status;
        this.stage = stage;
    }
}
