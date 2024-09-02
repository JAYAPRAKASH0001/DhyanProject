package com.drive.student.Admin;

import com.drive.student.Application.Application;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@Getter
@Setter
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company_name;
    private String type;
    private String role;
    private String status;
    private String location;
    private String package_lpa;
    private String discreption;
    private String no_rounds;
    private String apply_before;

    // Relationship with Application
    @OneToMany(mappedBy = "jobApplication", cascade = CascadeType.ALL, orphanRemoval = true)
   // @JsonIgnoreProperties("jobApplication")
    private List<Application> applications;
}