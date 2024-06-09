# Cafe Management System

Welcome to the Cafe Management System project! This repository contains the source code for the Cafe Management System application. This project is a Cafe Management System developed using Spring Boot and React.

## Description

The Cafe Management System is aimed at helping cafe owners manage various aspects of their business, including orders, inventory, and customer management.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/)

### Necessary files for configuration

- secret.properties
  - **Project will NOT run without this file.**  
  - This file should be placed in the `management/src/main/resources` directory.

- .env
  - This file should be placed in the `frontend` directory.
  
### Running the Application

- Clone the repository to your local machine.
   ```bash
   git clone https://github.com/Nosver/CafeManagement.git
   ```

### Running Frontend 

1. Navigate to the project directory
   ```bash
   cd CafeManagement
   ```

2. Navigate to the frontend directory
   ```bash
   cd frontend
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the frontend application
   ```bash
   npm run dev
   ```

5. Navigate back to the project directory
   ```bash
   cd ..
   ```
   
### Running Backend

1. Navigate to the backend directory
   ```bash
   cd management
   ```

2. If you're using Maven, you can use the following command to compile and run your application:
   ```bash
   ./mvnw spring-boot:run
   ```

   If you're using Gradle, you can use the following command instead:
   ```bash
   ./gradlew bootRun
   ```
