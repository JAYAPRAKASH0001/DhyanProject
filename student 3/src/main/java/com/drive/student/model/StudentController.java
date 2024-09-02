package com.drive.student.model;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.drive.student.AdminLogin.Admin;
import com.drive.student.AdminLogin.AdminService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private  AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        Optional<Student> student = studentService.getStudentByEmail(loginRequest.getEmail());
        Optional<Admin> admin = adminService.findAdminByEmail(loginRequest.getEmail());

        if (student.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), student.get().getPassword())) {
            // Handle student login
            return ResponseEntity.ok("student");
        } else if (admin.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), admin.get().getPassword())) {
            // Handle admin login
            return ResponseEntity.ok("admin");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }




    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Student student) {
        // Check if the email already exists
        Optional<Student> existingStudent = studentService.getStudentByEmail(student.getEmail());
        if (existingStudent.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered");
        }

        // Create the new student
        studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body("Signup successful");
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        Student student = studentService.findByEmail(email);
        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/id-by-email")
    public ResponseEntity<Long> getStudentIdByEmail(@RequestParam String email) {
        Student student = studentService.findByEmail(email);
        if (student != null) {
            return ResponseEntity.ok(student.getId());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/name-by-email")
    public ResponseEntity<Map<String, String>> getStudentNameByEmail(@RequestParam String email) {
        Student student = studentService.findByEmail(email);
        if (student != null) {
            Map<String, String> name = new HashMap<>();
            name.put("firstName", student.getFirstName());
            name.put("lastName", student.getLastName());
            return ResponseEntity.ok(name);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        return ResponseEntity.ok(studentService.updateStudent(id, studentDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }


    // Jop Controller


}