Your SRS is a good starting point, but it reads more like a project outline than an actual SRS. Since this is a **university/lab project**, I wouldn't add enterprise-level complexity (microservices, Kubernetes, distributed caching, etc.), but I would structure it like a professional SRS so that if you later migrate to PostgreSQL and production deployment, the design won't need major changes.

I'd also make one architectural decision up front:

> **Backend:** FastAPI + SQLAlchemy + SQLite (development/lab) with the ORM abstracting the database. This allows switching to PostgreSQL later by only changing the connection string.

---

# Software Requirements Specification (SRS)

# Workshop Management System

**Version:** 1.0

**Status:** Draft

---

# 1. Introduction

## 1.1 Purpose

The Workshop Management System (WMS) is a web-based application designed to simplify the planning, execution, and management of workshops conducted within an organization or institution.

The system provides centralized management for:

* Workshop creation
* Participant registration
* Attendance tracking
* Certificate generation
* Notifications
* Meeting Minutes (MoM)
* Key Takeaways
* User and role management

The system is intended as a **laboratory project** while following software engineering best practices and a production-oriented architecture wherever practical.

---

## 1.2 Scope

The application will allow different categories of users to interact with the system according to their assigned permissions.

Major capabilities include:

* User authentication
* Role-Based Access Control (RBAC)
* Event management
* Registration management
* Attendance tracking
* Certificate generation
* Notification management
* Audit logging
* Dashboard reporting

---

## 1.3 Intended Users

| User                 | Responsibilities                                               |
| -------------------- | -------------------------------------------------------------- |
| Attendee             | Register for workshops, attend sessions, download certificates |
| Organizer            | Create and manage workshops, attendance, MoM, certificates     |
| Speaker              | Upload presentation material and conduct sessions              |
| Organizing Committee | Assist organizers with logistics and workshop operations       |
| Administrator        | Manage users, permissions, monitor system health               |

---

# 2. System Overview

## 2.1 Architecture

The system follows a layered architecture.

```
React Frontend
        │
REST API
        │
FastAPI Backend
        │
SQLAlchemy ORM
        │
SQLite Database
```

SQLite is selected for simplicity during laboratory development.

The application should remain database-independent so that PostgreSQL or MySQL can be adopted later with minimal code changes.

---

## 2.2 Technology Stack

### Frontend

* React
* HTML5
* CSS3
* JavaScript

### Backend

* FastAPI
* Python 3.12+
* SQLAlchemy ORM
* Pydantic
* Uvicorn

### Database

* SQLite

### Authentication

* JWT Authentication
* bcrypt Password Hashing

### Documentation

* Swagger UI (FastAPI)
* OpenAPI Specification

---

# 3. Functional Requirements

## FR-1 User Authentication

The system shall allow users to:

* Register
* Login
* Logout
* Reset password (optional)
* Change password

Passwords shall never be stored in plaintext.

---

## FR-2 Role-Based Access Control

The system shall enforce authorization based on user roles.

Available roles:

* Administrator
* Organizer
* Organizing Committee
* Speaker
* Attendee

Only authorized users may access protected resources.

---

## FR-3 Workshop Management

Organizers shall be able to:

* Create workshops
* Update workshop details
* Delete workshops
* Publish workshops
* Close registrations

---

## FR-4 Registration Management

Attendees shall be able to:

* Browse workshops
* Register
* Cancel registration before deadline
* View registration status

---

## FR-5 Attendance Management

Organizers shall be able to:

* Mark attendance
* Update attendance
* View attendance reports

Attendees may view only their own attendance.

---

## FR-6 Certificate Management

The system shall:

* Generate certificates
* Store certificates
* Allow eligible attendees to download certificates

Only attendees with verified attendance receive certificates.

---

## FR-7 Notifications

The system shall support notifications for:

* Registration confirmation
* Workshop reminders
* Schedule updates
* Certificate availability

---

## FR-8 Meeting Minutes (MoM)

Organizers may:

* Upload meeting minutes
* Edit meeting minutes
* Share meeting minutes with authorized users

---

## FR-9 Key Takeaways

Organizers and speakers may upload:

* Summary
* Learning points
* Workshop outcomes

Participants may access these after the workshop.

---

## FR-10 User Management

Administrators may:

* Create users
* Disable users
* Reset passwords
* Assign roles

---

## FR-11 Dashboard

Different dashboards shall be available depending on user role.

Examples:

Attendee Dashboard

* Upcoming workshops
* Registered workshops
* Certificates

Organizer Dashboard

* Total workshops
* Attendance statistics
* Pending certificates

Admin Dashboard

* Active users
* Workshop statistics
* Audit logs
* System health

---

# 4. Non-Functional Requirements

## Performance

The application should support:

* Up to 300–500 concurrent users (target for laboratory evaluation)
* API response time below 2 seconds under normal load

---

## Reliability

The application should:

* Recover gracefully from errors
* Validate all user input
* Maintain data consistency

---

## Availability

Since this is a laboratory project:

* Single-server deployment
* Manual backups
* Health monitoring endpoint

Production enhancements are outside project scope.

---

## Scalability

The architecture should allow migration to:

* PostgreSQL
* MySQL

without major code changes.

---

## Maintainability

The codebase shall follow:

* Modular architecture
* RESTful API design
* Dependency Injection
* Layer separation

---

## Usability

The interface should be:

* Responsive
* Easy to navigate
* Consistent across pages

---

# 5. Security Requirements

## Authentication

* JWT authentication
* bcrypt password hashing
* Secure login endpoint

---

## Authorization

Role-Based Access Control shall be enforced on every protected API endpoint.

---

## Input Validation

All user inputs shall be validated using Pydantic models.

---

## Data Protection

Sensitive information shall never be exposed through public APIs.

HTTPS is recommended for deployment.

---

## Session Security

JWT tokens shall expire after a configurable duration.

---

# 6. Privacy Classification

The system classifies information into three privacy bands.

| Band      | Description                          | Accessible By                                            |
| --------- | ------------------------------------ | -------------------------------------------------------- |
| 🟢 Green  | Public information                   | Everyone (including unauthenticated users if applicable) |
| 🟡 Yellow | Internal operational information     | Organizers, Organizing Committee, Administrators         |
| 🔴 Red    | Personal or confidential information | Only the data owner and legal issues      |

## Green Examples

* Workshop schedule
* Workshop description
* Speaker list
* Public announcements

---

## Yellow Examples

* Attendance lists
* Internal meeting minutes
* Organizer notes
* Planning documents
* Internal reports

---

## Red Examples

* User profile
* Email
* Password hash
* Registration details
* Personal certificates
* Login history

---

# 7. Accountability and Audit Service

The system shall maintain accountability by recording significant system activities.

## Audit Logging

The system shall log:

* User login/logout
* Registration events
* Workshop creation/update/deletion
* Attendance modifications
* Certificate generation
* Role changes
* Failed login attempts
* Unauthorized access attempts

Each audit record should include:

* Timestamp
* User ID
* Action performed
* Resource affected
* Result (Success/Failure)
* IP address (optional for lab project)

---

## System Logging

Application logs shall record:

* API requests
* Server errors
* Database errors
* Validation failures
* Startup and shutdown events

---

## Health Monitoring

The system shall expose a health endpoint.

Example:

```
GET /health
```

Returns:

* API status
* Database connectivity
* Application uptime

---

## Error Monitoring

Unhandled exceptions shall be:

* Logged
* Returned as standardized error responses
* Hidden from end users (no stack traces)

---

## Administrative Monitoring

Administrators shall be able to:

* View recent audit logs
* Search audit history
* Monitor failed login attempts
* Review system errors (optional)

---

# 8. CIA Triad

## Confidentiality

* RBAC
* JWT Authentication
* Privacy classification
* Password hashing

---

## Integrity

* Input validation
* Audit logging
* Certificate verification
* Database constraints

---

## Availability

* Health endpoint
* Exception handling
* Manual database backup
* Graceful server startup/shutdown


---
