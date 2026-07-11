![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933)
![Express](https://img.shields.io/badge/Express-REST%20API-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-black)
![Status](https://img.shields.io/badge/Status-Completed-success)

# 🚀 Protothon 2026

> **Protothon 2026 is a full-stack hackathon management platform developed to streamline registrations, participant management, abstract submission, evaluation, and shortlisting through a centralized web application.**

---

# Overview

Organizing a hackathon involves much more than collecting registrations.

Event organizers need to securely manage participant information, authenticate users, collect project abstracts, review submissions, update team statuses, and maintain records throughout the event.

Protothon 2026 was developed to digitize this complete workflow.

Instead of relying on multiple spreadsheets and manual coordination, the platform provides a centralized system where participants can register, manage their submissions, and track their application status, while organizers can efficiently administer registrations, review project ideas, shortlist teams, and export participant information whenever required.

The project was designed with simplicity, reliability, and maintainability in mind while supporting the complete lifecycle of a student innovation event.

---

# Features

Protothon 2026 currently provides:

- Team Registration Portal
- Secure JWT Authentication
- Student Dashboard
- Admin Dashboard
- Abstract Submission & Editing
- Registration Deadline Enforcement
- Team Status Management (Pending / Selected / Rejected)
- MongoDB Atlas Integration
- Excel Export for Team Data
- Responsive User Interface
- RESTful Backend API

---

# Architecture

The application follows a client-server architecture.

```text
                    Participants
                          │
                          ▼
                 React Frontend (Vercel)
                          │
                     REST API
                          │
                          ▼
                Express.js Backend (Render)
                          │
                          ▼
                  MongoDB Atlas
```

The frontend communicates with the backend using REST APIs, while MongoDB Atlas stores all participant information. Authentication is handled through JWT, ensuring that only authenticated teams can access their dashboard.

---

# Technology Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- React Toastify

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- ExcelJS
- dotenv

## Deployment

- Vercel
- Render
- MongoDB Atlas

---

# Backend Design

The backend follows a modular architecture where responsibilities are separated into dedicated components.

Business logic is distributed across:

- Routes
- Models
- Middleware
- Utility Functions

This separation keeps authentication, registration, dashboard operations, administrative actions, and database interactions independent, making the project easier to maintain and extend.

---

# System Modules

## Team Registration

Participants register by providing:

- Team Information
- Leader Details
- Member Details
- Domain Selection
- Problem Statement
- Project Abstract

Passwords are securely hashed before being stored in the database.

---

## Authentication

The platform implements JWT-based authentication.

Authenticated participants can:

- Access their dashboard
- View team details
- Edit project abstracts before the submission deadline
- View current selection status

Protected routes are secured through authentication middleware.

---

## Student Dashboard

The participant dashboard allows teams to:

- View registration details
- View selected domain
- View project abstract
- Update abstract before the deadline
- Track application status

---

## Admin Dashboard

The administrative interface allows organizers to:

- View all registered teams
- Review submitted abstracts
- Update team status
- Export registrations to Excel
- Manage participant information

---

# Engineering Decisions

Several architectural decisions significantly influenced the development of Protothon 2026.

## Modular Backend

Rather than placing all business logic inside a single server file, responsibilities were separated into routes, middleware, models, and utility modules.

This organization improved readability and simplified debugging.

---

## Secure Authentication

Passwords are hashed using bcrypt before storage, while JWT tokens secure protected routes.

This ensures participant credentials remain protected throughout the application.

---

## Document-Oriented Database

MongoDB Atlas was selected because team registrations naturally fit a document-based structure, allowing leader information, team members, and project details to be stored together.

---

## Administrative Automation

Administrative workflows such as status updates, participant management, and Excel exports significantly reduced manual work during event coordination.

---

# Real-World Deployment Experience

Unlike many academic projects that remain local demonstrations, Protothon 2026 was deployed and used during an actual college innovation event.

The platform successfully handled:

- Live participant registrations
- Team authentication
- Abstract submissions
- Administrative shortlisting
- Database management
- Excel report generation

Maintaining the application during active usage provided practical experience in production debugging, deployment management, live database operations, and responding to real user issues under time constraints.

---

# What I Learned

Developing Protothon 2026 provided practical experience with:

- Full-stack web development
- REST API development
- MongoDB Atlas
- JWT Authentication
- Password Hashing
- Deployment using Render & Vercel
- Production debugging
- Database administration
- Live application maintenance
- Event management system design
- Software deployment workflows

Perhaps the most valuable lesson from this project was understanding that developing software is only part of the journey. Deploying, maintaining, debugging, and supporting a live application used by real participants introduced an entirely different set of engineering challenges that significantly strengthened my practical development skills.

---

# Future Improvements

- [ ] Judge Authentication
- [ ] Faculty Dashboard
- [ ] Automated Shortlisting
- [ ] Certificate Generation
- [ ] Attendance Management
- [ ] Analytics Dashboard
- [ ] Multi-event Support
- [ ] Docker Deployment
- [ ] Role-Based Access Control
- [ ] Audit Logs

---

# Project Philosophy

Protothon 2026 was developed to simplify the organization of student innovation events through software.

Rather than focusing only on registrations, the platform was designed to support the complete lifecycle of an event—from participant onboarding and authentication to abstract submission, evaluation, shortlisting, and administrative management.

Throughout development, emphasis was placed on building a reliable, maintainable, and user-friendly system capable of supporting real event operations rather than simply demonstrating technical concepts.

---

# Acknowledgements

Protothon 2026 was developed as the official event management platform for the Protothon 2026 innovation event.

Special thanks to:

- **Dr. R. Thilakarasi** (Head of the Department) for her approval, encouragement, and valuable suggestions.
- **Sangeethapriya J** (Staff Coordinator) for her continuous guidance and support throughout the event.

The project also benefited from the dedication and teamwork of the student coordinators, whose collective efforts contributed to the successful planning and execution of Protothon 2026.
