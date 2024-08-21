# Cafe Management System

Welcome to the Cafe Management System project! This repository contains the source code for the Cafe Management System application. This project is a Cafe Management System developed using Spring Boot and React.

## Contents
- [Description](#description)
- [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Necessary files for configuration](#necessary-files-for-configuration)
   - [Running the Application](#running-the-application)
   - [Running Frontend](#running-frontend)
   - [Running Backend](#running-backend)
   - [Running Stripe CLI](#running-stripe-cli)
- [Configurations](#configurations)
   - [How to configure secret.properties](#how-to-configure-secretproperties)
   - [Configuring the .env file](#configuring-the-env-file)

## Description

The Cafe Management System is aimed at helping cafe owners manage various aspects of their business, including orders, inventory, and customer management.

![image](https://github.com/user-attachments/assets/331e8b9c-2c95-468f-9b46-d23e2dd7a158)
![image](https://github.com/user-attachments/assets/31794ba5-2754-4549-aae7-054c7a573712)
![image](https://github.com/user-attachments/assets/56cfb35f-2943-40d3-89b8-5da1efb69259)
![image](https://github.com/user-attachments/assets/4f18fba8-540d-4a83-81ef-2a48dc0a1952)
![image](https://github.com/user-attachments/assets/414337f7-4f1c-48cc-9678-2a104e00615f)
![image](https://github.com/user-attachments/assets/41aceacc-57f4-4610-9465-2994a0bb43e2)


## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

### Necessary files for configuration

- `secret.properties`
  - **Project will NOT run without this file.**  
  - This file should be placed in the `management/src/main/resources` directory.
  - How to configure: See [How to configure secret.properties](#how-to-configure-secretproperties)

- `.env`
  - This file should be placed in the `frontend` directory.
  - How to configure: See [Configuring the .env file](#configuring-the-env-file)
  
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

### Running Stripe cli
   ```bash
   stripe listen --forward-to localhost:8080/stripe/events
   ```

## Configurations

### How to configure secret.properties

The application requires a `secret.properties` file for configuration. This file should be placed in the `src/main/resources` directory. Here's what it should contain:

```java-properties
# Stripe API keys
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# JWT Secret Key
JWT_SECRET_KEY=your_jwt_secret_key

# Stripe Webhook Secret
stripe.webhook.secret=your_stripe_webhook_secret

# Database Configuration
spring.datasource.url=your_database_url
spring.datasource.username=your_database_username
spring.datasource.password=your_database_password

# Mail Configuration
spring.mail.username=your_email_username
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.host=your_smtp_host
spring.mail.port=your_smtp_port
spring.mail.password=your_email_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.transport.protocol=smtp
spring.mail.properties.mail.smtp.starttls.enable=true

# Azure Blob Storage Configuration
azure.blob-storage.connection-string=your_azure_blob_storage_connection_string
spring.cloud.azure.storage.blob.container-name=your_azure_blob_storage_container_name
```

### Configuring the .env file

The `.env` file is used to set environment variables for your application. The file should be located at `frontend/.env`.

Here's an example of what your `.env` file might look like:

```properties
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

How to get Google Client ID: [Google Developers Console](https://console.developers.google.com/)
