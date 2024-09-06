package com.drive.student.model;

import com.drive.student.Admin.JobApplication;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Setter
@Getter
public class Student {

    public enum Gender {
        MALE, FEMALE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String password;  // Ensure this is included in your database schema

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate dob;
    private String phoneNumber;
    private String email;

    private double mark10th;
    private double mark12th;
    private double ugMark;

    private int backlog;
    private int activeBacklog;

//    @ElementCollection
//    @CollectionTable(name = "year_of_passing", joinColumns = @JoinColumn(name = "student_id"))
//    @Column(name = "year")
//    private List<Integer> yearOfPassing;

    private String interestedCourse;

    @ManyToMany
    @JoinTable(
            name = "favourite_job",
            joinColumns = @JoinColumn(
                    name = "student_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "job_id",
                    referencedColumnName = "id"
            )
    )
    private Set<JobApplication> favouriteJobs = new HashSet<>();
}