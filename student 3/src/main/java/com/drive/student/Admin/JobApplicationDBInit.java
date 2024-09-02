package com.drive.student.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JobApplicationDBInit implements CommandLineRunner {

    @Autowired
    private JobApplicationRepo jobApplicationRepo;

    @Override
    public void run(String... args) throws Exception {
        if (jobApplicationRepo.count() > 0) {
            log.info("Job Application data already exists");
            return;
        }

        try {
            // Create Job Application 1
            JobApplication jobApplication1 = new JobApplication();

            jobApplication1.setCompany_name("Tech Solutions");
            jobApplication1.setType("Full-Time");
            jobApplication1.setRole("Software Engineer");
            jobApplication1.setStatus("Open");
            jobApplication1.setLocation("San Francisco, CA");
            jobApplication1.setPackage_lpa("15");
            jobApplication1.setDiscreption("Looking for a skilled software engineer to join our team.");
            jobApplication1.setNo_rounds("3");
            jobApplication1.setApply_before("2024-09-30");

            jobApplicationRepo.save(jobApplication1);

            // Create Job Application 2
            JobApplication jobApplication2 = new JobApplication();
            jobApplication2.setCompany_name("Innovate Inc.");
            jobApplication2.setType("Internship");
            jobApplication2.setRole("Data Analyst Intern");
            jobApplication2.setStatus("Open");
            jobApplication2.setLocation("New York, NY");
            jobApplication2.setPackage_lpa("5");
            jobApplication2.setDiscreption("Internship opportunity for data analysts with a passion for data-driven insights.");
            jobApplication2.setNo_rounds("2");
            jobApplication2.setApply_before("2024-10-15");

            jobApplicationRepo.save(jobApplication2);

            // Create Job Application 3
            JobApplication jobApplication3 = new JobApplication();
            jobApplication3.setCompany_name("Creative Agency");
            jobApplication3.setType("Contract");
            jobApplication3.setRole("Graphic Designer");
            jobApplication3.setStatus("Closed");
            jobApplication3.setLocation("Los Angeles, CA");
            jobApplication3.setPackage_lpa("8");
            jobApplication3.setDiscreption("Seeking a graphic designer for a 6-month contract.");
            jobApplication3.setNo_rounds("1");
            jobApplication3.setApply_before("2024-08-30");

            jobApplicationRepo.save(jobApplication3);

            // Create Job Application 4
            JobApplication jobApplication4 = new JobApplication();
            jobApplication4.setCompany_name("HealthCorp");
            jobApplication4.setType("Full-Time");
            jobApplication4.setRole("Medical Researcher");
            jobApplication4.setStatus("Open");
            jobApplication4.setLocation("Chicago, IL");
            jobApplication4.setPackage_lpa("12");
            jobApplication4.setDiscreption("Full-time position for a medical researcher with experience in clinical trials.");
            jobApplication4.setNo_rounds("3");
            jobApplication4.setApply_before("2024-11-01");

            jobApplicationRepo.save(jobApplication4);

            log.info("All job applications added successfully");

        } catch (Throwable e) {
            log.error("Something went wrong while inserting default job application records", e);
        }
    }
}
