 1. Create a new Spring Boot project using Spring Initializr.
Select the following dependencies:
Spring Web
Spring Data JPA
PostgreSQL
Lombok

2. Add the following code to your `pom.xml` file:

```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
    <dependency>
        <groupId>lombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

3. Create a new package called `com.user.backend.BackendUserApi`.

4. Create a new class called `BackendUserApiApplication.java` in the `com.user.backend.BackendUserApi` package.

```java
package com.user.backend.BackendUserApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendUserApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendUserApiApplication.class, args);
	}

}
```

5. Create a new class called `UserController.java` in the `com.user.backend.BackendUserApi.controller` package.

```java
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
```



CODES:



UserModel.java
package com.user.backend.BackendUserApi.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class userModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

}


ResorceNotFoundException.java

package com.user.backend.BackendUserApi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message){
        super(message);
    }
}


UserRepository.java

package com.user.backend.BackendUserApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.user.backend.BackendUserApi.model.userModel;
public interface UserRepository extends JpaRepository<userModel, Long> {
}
