# 🏋️‍♂️ FitForge – Gym Class Scheduling & Membership Management System

FitForge is a **Gym Class Scheduling and Membership Management System** designed to manage gym operations efficiently and securely.  
This system streamlines the process of **class scheduling**, **membership management**, and **role-based access control** for **Admins**, **Trainers**, and **Trainees**.

Admins can create and manage trainers, schedule classes (max 5 per day), and assign trainers. Trainers can view their assigned schedules and conduct classes. Trainees can create and manage their own profiles and book classes (max 10 trainees per schedule). The system enforces strong **business rules**, **JWT-based authentication**, and **robust error handling** to ensure smooth operations.

---

## 🌐 Live Demo

- **Backend API**: [https://fitforge-server.com](https://fitforge-server.onrender.com)
- **GitHub Repository**: [https://github.com/modasser-nayem/fitforge](https://github.com/modasser-nayem/fitforge)

---

## 📑 Table of Contents

- [Documentation](#documentation)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Business Rules](#business-rules)
- [Roles & Permissions](#roles--permissions)
- [Relational Diagram](#relational-diagram)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Testing Instructions](#testing-instructions)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)
- [Author](#author)

---

## 📄 Documentation

- **[📬 API Endpoints Documentation (Postman)](https://documenter.getpostman.com/view/xxxxxx)**
- **[🗂️ Relational Diagram](https://drive.google.com/file/d/RELATIONAL_DIAGRAM_LINK/view?usp=sharing)**

---

## 🚀 Features

- 🔐 **User Authentication & Authorization using JWT**
- 🧑‍💼 **Role-based Access Control** – Admin, Trainer & Trainee
- 📅 **Class Scheduling Management** – Max 5 classes per day, 2-hour duration
- 🏋️‍♀️ **Booking System** – Max 10 trainees per schedule
- 🚫 **Business Rule Enforcement** – Booking & schedule limits
- 🐳 **Dockerized for Deployment**
- 🧪 **Unit & Integration Testing with Jest & Supertest**
- ⚡ **Robust Error Handling** – Global error middleware
- 📝 **Validation with Zod**
- 🛠️ **CI/CD** with GitHub Actions

---

## 🛠️ Tech Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Language         | TypeScript             |
| Frameworks       | Node.js, Express.js    |
| Databases        | PostgreSQL             |
| ORM              | Prisma                 |
| Authentication   | JWT, Bcrypt            |
| Validation       | Zod                    |
| Containerization | Docker, Docker Compose |
| Documentation    | Postman                |
| Testing          | Jest, Supertest        |

---

## 🧱 Architecture Overview

FitForge follows a **clean, modular architecture**:

- **Layered structure** for scalability & maintainability
- **Separation of concerns** with clear module boundaries
- **Zod-based DTO validation**
- **Role-based middleware for access control**
- **Global error handling**
- **Logger (Winston)** for debugging and monitoring

---

## 📜 Business Rules

### Class Scheduling

- ⏳ **Max 5 class schedules per day**, each lasting **2 hours**.
- 👥 **Max 10 trainees per class schedule**. Once full, no more bookings allowed.
- 🧑‍💼 **Admins** are responsible for creating schedules and assigning trainers.

### Booking System

- ✅ **Trainees** can book a class only if slots are available.
- 🚫 A trainee **cannot book multiple classes** in the same time slot.
- ❌ Trainees can **cancel their bookings** if needed.

### Error Handling

- Unauthorized Access – Returns `401` with message:

```json
{
  "success": false,
  "message": "Unauthorized access.",
  "errorDetails": "You must be an admin to perform this action."
}
```

- Validation Errors – Returns:

```json
{
  "success": false,
  "message": "Validation error occurred.",
  "errorDetails": [
    {
      "field": "email",
      "message": "Invalid email format."
    }
  ]
}
```

- Booking Limit Exceeded:

```json
{
  "success": false,
  "message": "Class schedule is full. Maximum 10 trainees allowed per schedule."
}
```

- Success Response:

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Class booked successfully",
  "Data": [ ...response data... ]
}

```

---

## 👥 Roles & Permissions

| Role    | Capabilities                                                             |
| ------- | ------------------------------------------------------------------------ |
| Admin   | Create & manage trainers, schedule classes (max 5/day), assign trainers  |
| Trainer | View assigned schedules, conduct classes                                 |
| Trainee | Create/manage profile, book/cancel class schedules (max 10 per schedule) |

---

## 🗂️ Relational Diagram

---

---

## 🗃️ Database Schema

```

```

---

## 📬 API Endpoints

> Base URL: `https://fitforge.com/api`

- **API Endpoints Documentation**: []()

---

<p align="right"><a href="#readme-top">back to top</a></p>

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/modasser-nayem/fitforge.git

cd fitforge

yarn install

cp .env.example .env

yarn prisma migrate deploy

yarn prisma generate

yarn dev # Make sure PostgreSQL are running. And also add all .env variable
```

---

## 🧪 Scripts

```bash
# Run in development mode
yarn dev


# Run tests
yarn test

# Build for production
yarn build

# Run in production mode
yarn start

# Format code
yarn format

# Lint code
yarn lint
```

---

## 🧪 Testing Instructions

**User Credentials:**

```bash
    # Admin
    email: admin@gmail.com
    password: 123456

    #Trainer
    email: trainer@gmail.com
    password: 123456

    # Trainee
    email: trainee@gmail.com
    password: 123456
```

#### Steps to Test:

- Login as admin → Create trainers & schedule classes.

- Login as trainer → View assigned schedules.

- Login as trainee → Book a class until the 10 trainee limit is reached.

- Try booking more than 10 trainees → Should return "Class schedule is full".

- Try creating more than 5 classes per day → Should return schedule limit error.

---

## 📦 Deployment

Server hosted on -

Dockerized infrastructure with support for docker-compose

---

## 🪪 License

This project is licensed under the MIT License.

---

## 📣 Author

#### Ali Modasser Nayem

🔗 [Portfolio](https://alimodassernayem.vercel.app/) | [GitHub](https://github.com/modasser-nayem) | [LinkedIn](https://www.linkedin.com/in/alimodassernayem/)

Email: [modassernayem@gmail.com](modassernayem@gmail.com)

---

<p align="right"><a href="#readme-top">back to top</a></p>
