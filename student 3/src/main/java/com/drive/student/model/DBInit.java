package com.drive.student.model;

import java.time.LocalDate;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class DBInit implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (studentRepo.count() > 0) {
            log.info("Data already exists");
            return;
        }

        try {
            // Create Student 1
            Student student1 = new Student();
            student1.setFirstName("John");
            student1.setLastName("Doe");
            student1.setPassword(passwordEncoder.encode("password123")); // Hash the password
            student1.setGender(Student.Gender.MALE);
            student1.setDob(LocalDate.of(2005, 1, 1)); // Set a specific date
            student1.setPhoneNumber("1234567890");
            student1.setEmail("john.doe@example.com");
            student1.setMark10th(85.5);
            student1.setMark12th(88.0);
            student1.setUgMark(75.0);
            student1.setBacklog(0);
            student1.setActiveBacklog(0);
          //  student1.setYearOfPassing(Arrays.asList(2018, 2020));
            student1.setInterestedCourse("Computer Science");

            studentRepo.save(student1);

            // Create Student 2
            Student student2 = new Student();
            student2.setFirstName("Jane");
            student2.setLastName("Smith");
            student2.setPassword(passwordEncoder.encode("password456")); // Hash the password
            student2.setGender(Student.Gender.FEMALE);
            student2.setDob(LocalDate.of(2005, 1, 1)); // Set a specific date
            student2.setPhoneNumber("0987654321");
            student2.setEmail("jane.smith@example.com");
            student2.setMark10th(90.0);
            student2.setMark12th(92.5);
            student2.setUgMark(80.0);
            student2.setBacklog(1);
            student2.setActiveBacklog(1);
          //  student2.setYearOfPassing(Arrays.asList(2018, 2020));
            student2.setInterestedCourse("Electronics");

            studentRepo.save(student2);

            // Create Student 3
            Student student3 = new Student();
            student3.setFirstName("Aki");
            student3.setLastName("aki");
            student3.setPassword(passwordEncoder.encode("password2534")); // Hash the password
            student3.setGender(Student.Gender.MALE);
            student3.setDob(LocalDate.of(2004, 1, 1)); // Set a specific date
            student3.setPhoneNumber("1234567890");
            student3.setEmail("aki.doe@example.com");
            student3.setMark10th(85.5);
            student3.setMark12th(88.0);
            student3.setUgMark(75.0);
            student3.setBacklog(0);
            student3.setActiveBacklog(0);
           // student3.setYearOfPassing(Arrays.asList(2018, 2020));
            student3.setInterestedCourse("Computer Science");

            studentRepo.save(student3);

            // Create Student 4
            Student student4 = new Student();
            student4.setFirstName("Sara");
            student4.setLastName("Connor");
            student4.setPassword(passwordEncoder.encode("password789")); // Hash the password
            student4.setGender(Student.Gender.FEMALE);
            student4.setDob(LocalDate.of(2003, 1, 1)); // Set a specific date
            student4.setPhoneNumber("1112233445");
            student4.setEmail("sara.connor@example.com");
            student4.setMark10th(89.5);
            student4.setMark12th(90.0);
            student4.setUgMark(70.0);
            student4.setBacklog(0);
            student4.setActiveBacklog(0);
          //  student4.setYearOfPassing(Arrays.asList(2018, 2020));
            student4.setInterestedCourse("Mathematics");

            studentRepo.save(student4);

            log.info("All students added successfully");

        } catch (Throwable e) {
            log.error("Something went wrong while inserting default records", e);
        }
    }
}
