# Employee Management App

Welcome to the Employee Management App! This application consists of both a frontend React application and a backend Spring Boot API that together allow users to manage employee data.

![Screenshot](https://github.com/Rahul-Sahani04/UsersMngApp/blob/main/src/images/UserMgrApp.png?raw=true)

## Table of Contents

- [Frontend](#frontend)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
- [Backend](#backend)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started-1)
  - [API Endpoints](#api-endpoints)
- [Conclusion](#conclusion)

## Frontend

The frontend part of the application is built using React. It provides a user-friendly interface for managing employee data.

### Getting Started

To get started with the frontend, follow these steps:

1. **Clone the Repository:**
    ```bash
   git clone https://github.com/Rahul-Sahani04/UsersMngApp.git
   cd employee-app
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```


3. **Start the Development Server:**
    ```bash
    npm start
    ```


4. **Access the Application:**

Open your web browser and go to http://localhost:3000 to use the application.

## Usage

### Frontend

The frontend allows you to:

- **Add a New Employee:** Enter the first name and last name of the employee in the input fields and click the "Add User" button.
- **Edit an Employee:** Click the "Edit" button for the employee you want to edit. Make the necessary changes and click the "Update" button.
- **Delete an Employee:** Click the "Delete" button for the employee you want to delete. This will remove the employee from the database.

### Backend

The backend component of the application is built using Spring Boot. It provides RESTful API endpoints for managing employee data.

#### Prerequisites

Before setting up the backend, ensure that you have the following dependencies:

- Java Development Kit (JDK)
- PostgreSQL Database

#### Getting Started

To set up the backend, follow these steps:

1. **Create a Spring Boot Project:**
   Create a new Spring Boot project using Spring Initializr with the required dependencies: Spring Web, Spring Data JPA, PostgreSQL, and Lombok.

2. **Add Dependencies:**
   Add the provided code snippets to your `pom.xml` file to include the required dependencies.

3. **Implement Classes:**
   Implement the provided classes `BackendUserApiApplication.java` and `UserController.java` in the appropriate packages as mentioned in the provided code.

4. **Configure Database:**
   Configure the PostgreSQL database connection properties in the `application.properties` file.

5. **Run the Application:**
   Run the Spring Boot application. The backend will start on a specified port (usually 8080).

#### API Endpoints

The backend provides the following API endpoints:

- **GET /api/v1/user:** Retrieve a list of all employees.
- **POST /api/v1/user:** Create a new employee.
- **GET /api/v1/user/{id}:** Retrieve details of a specific employee by ID.
- **PUT /api/v1/user/{id}:** Update details of a specific employee by ID.
- **DELETE /api/v1/user/{id}:** Delete a specific employee by ID.

## Conclusion

Congratulations! You now have a complete Employee Management App that seamlessly integrates both frontend and backend components. This app can serve as a strong foundation for more complex applications that require efficient employee data management.

Feel free to explore and extend the functionality of both the frontend and backend components to cater to your specific requirements.
