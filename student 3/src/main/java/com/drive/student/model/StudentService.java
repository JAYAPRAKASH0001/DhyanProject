package com.drive.student.model;

import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import java.util.List;
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Student createStudent(Student student) {
        student.setPassword(passwordEncoder.encode(student.getPassword())); // Hash the password
        return studentRepository.save(student);
    }
    public Student findByEmail(String email) {
        return studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
    }
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);

        // Update student details
        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setGender(studentDetails.getGender());
        student.setDob(studentDetails.getDob());
        student.setPhoneNumber(studentDetails.getPhoneNumber());
        student.setEmail(studentDetails.getEmail());
        student.setMark10th(studentDetails.getMark10th());
        student.setMark12th(studentDetails.getMark12th());
        student.setUgMark(studentDetails.getUgMark());
        student.setBacklog(studentDetails.getBacklog());
        student.setActiveBacklog(studentDetails.getActiveBacklog());
        student.setInterestedCourse(studentDetails.getInterestedCourse());

        // Only update and rehash the password if it's changed
        if (studentDetails.getPassword() != null && !studentDetails.getPassword().isEmpty()) {
            // Check if the password has changed
            if (!passwordEncoder.matches(studentDetails.getPassword(), student.getPassword())) {
                student.setPassword(passwordEncoder.encode(studentDetails.getPassword()));
            }
        }

        return studentRepository.save(student);
    }
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }


}