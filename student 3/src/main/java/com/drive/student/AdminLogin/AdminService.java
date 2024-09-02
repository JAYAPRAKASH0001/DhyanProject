package com.drive.student.AdminLogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepo.findById(id);
    }

    public Admin createAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepo.save(admin);
    }

    public Admin updateAdmin(Admin admin) {
        return adminRepo.save(admin);
    }

    public void deleteAdmin(Long id) {
        adminRepo.deleteById(id);
    }

    public Optional<Admin> findAdminByEmail(String email) {
        return adminRepo.findByEmail(email);
    }

    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepo.findByEmail(email);
    }
}