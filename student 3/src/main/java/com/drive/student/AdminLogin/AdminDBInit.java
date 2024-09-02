package com.drive.student.AdminLogin;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AdminDBInit implements CommandLineRunner {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (adminRepo.count() > 0) {
            log.info("Admin data already exists");
            return;
        }

        try {
            // Create Admin 1
            Admin admin1 = new Admin();
            admin1.setUsername("admin1");
            admin1.setEmail("admin1@example.com");
            admin1.setPassword(passwordEncoder.encode("password1")); // Hash the password
            adminRepo.save(admin1);

            // Create Admin 2
            Admin admin2 = new Admin();
            admin2.setUsername("admin2");
            admin2.setEmail("aki@gmail.com");
            admin2.setPassword(passwordEncoder.encode("aki")); // Hash the password
            adminRepo.save(admin2);

            log.info("All admins added successfully");

        } catch (Throwable e) {
            log.error("Something went wrong while inserting default admin records", e);
        }
    }
}