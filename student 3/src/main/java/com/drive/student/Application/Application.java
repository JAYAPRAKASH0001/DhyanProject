package com.drive.student.Application;

import com.drive.student.Admin.JobApplication;
import com.drive.student.model.Student;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "job_application_id", nullable = false)
    @JsonIgnoreProperties("applications")
    private JobApplication jobApplication;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    private String stage;
    private  int is_stage;
    public enum ApplicationStatus {
        ACCEPTED, REJECTED, PENDING
    }
}