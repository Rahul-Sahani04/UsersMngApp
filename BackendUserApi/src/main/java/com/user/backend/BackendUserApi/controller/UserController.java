package com.user.backend.BackendUserApi.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.user.backend.BackendUserApi.repository.UserRepository;
import com.user.backend.BackendUserApi.exception.ResourceNotFoundException;
import com.user.backend.BackendUserApi.model.userModel;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserRepository employeeRepository;



    @GetMapping
    public List<userModel> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @PostMapping
    public userModel createEmployee(@RequestBody userModel employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping("{id}")
    public ResponseEntity<userModel> getEmployeeById(@PathVariable long id) {
        userModel employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("userModel does not exist with id: " + id));
        return ResponseEntity.ok(employee);
    }

    @PutMapping("{id}")
    public ResponseEntity<userModel> updateEmployee(@PathVariable long id, @RequestBody userModel updatedEmployee) {
        userModel employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("userModel does not exist with id: " + id));
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        final userModel updatedEmployeeDB = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployeeDB);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable long id) {
        userModel employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("userModel does not exist with id: " + id));
        employeeRepository.delete(employee);
        return ResponseEntity.ok("Deleted employee with id: " + id);
    }





}
