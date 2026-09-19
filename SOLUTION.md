# SOLUTION — PS8: AI-Powered Job Description Generator

## 1. Problem Understanding

The objective is to build a full-stack application that helps employers generate structured job descriptions from:

- Job Title
- Industry
- Experience Level
- Key Skills
- Company Culture
- Special Requirements

The generated JD contains:

- About the Role
- Responsibilities
- Required Skills
- Preferred Skills
- Experience
- What We Offer
- About the Company

## 2. Solution Overview

JD Studio uses a React frontend and Spring Boot backend.

```text
User
  ↓
React Frontend
  ↓ REST API
Spring Boot Backend
  ↓
Generation Engine
  ↓
H2 Database
```

The frontend handles input, editing, variations, ATS analysis, drafts and PDF export. The backend handles validation, generation and persistence.

## 3. Generation Approach

The current system uses a deterministic, template-based generation engine.

It considers:

- Job title
- Industry
- Experience level
- Skills
- Company culture
- Special requirements

This approach provides predictable, explainable and easily testable output without requiring an external AI API.

The architecture can later be extended with an LLM-based generation layer.

## 4. Industry-Aware Generation

Industry-specific rules improve the relevance of generated responsibilities.

Examples:

- **FinTech:** security, transaction integrity and financial technology
- **Healthcare:** privacy, security and healthcare workflows
- **E-commerce:** digital commerce and scalable customer-facing solutions
- **Education:** learning experiences and user engagement
- **Software/Technology:** scalable and maintainable software solutions

A general fallback is used for unsupported industries.

## 5. Skill-Based Generation

The submitted skills are used in responsibilities and required skills.

Related preferred skills can also be generated.

Examples:

```text
Java → Spring Boot
React → JavaScript
Python → SQL
Spring Boot → REST APIs
JavaScript → TypeScript
Machine Learning → Python, Data Analysis
```

## 6. Frontend Workflow

The application follows a four-step workflow:

```text
Role
  ↓
Requirements
  ↓
Company
  ↓
Review
  ↓
Generate
  ↓
Edit / Analyze / Save
```

Users can edit generated sections, add or remove list items, switch between JD variations, copy the JD and export it as PDF.

## 7. JD Variations

Three presentation styles are provided:

- **Standard** — complete balanced JD
- **Concise** — shorter version
- **Impact-focused** — emphasizes impact-oriented content

## 8. ATS Analysis

The application provides a lightweight keyword coverage score.

Keywords are taken from:

- Required skills
- Preferred skills
- Industry
- Experience level

The generated JD is checked for these keywords and a percentage-based coverage score is displayed.

This is a heuristic indicator and is not intended to reproduce commercial ATS scoring systems.

## 9. Draft Management

Saved descriptions can be retrieved and edited later.

```text
Generate
  ↓
Save
  ↓
Saved Draft
  ↓
Open
  ↓
Edit
  ↓
Update
```

H2 and Spring Data JPA are used for persistence.

## 10. Backend Architecture

The backend follows a layered structure:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
H2 Database
```

### Controller

Handles REST requests and validation.

### DTO

Separates API request/response models from the database entity.

### Service

Contains the job description generation and business logic.

### Repository

Uses Spring Data JPA for database operations.

### Entity

Stores the generated job description and associated metadata.

## 11. REST APIs

```text
POST /api/job-descriptions/generate
POST /api/job-descriptions/save
POST /api/job-descriptions/save-edited
GET  /api/job-descriptions
GET  /api/job-descriptions/{id}
```

Swagger documentation is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

## 12. Validation

Jakarta Validation is used for required request fields.

The required fields are:

- Job Title
- Industry
- Experience Level
- At least one Skill
- Company Culture

This prevents incomplete requests from reaching the generation layer.

## 13. Testing

Backend tests use Spring Boot Test and JUnit.

They cover:

- Application context loading
- Job description generation
- Generated content structure
- Required skills
- Industry-specific generation behavior

Run tests with:

```powershell
cd jobdescription
.\mvnw.cmd test
```

## 14. Design Trade-offs

### Template-Based Generation

**Advantages:**

- Predictable
- Explainable
- Easy to test
- No external API dependency
- No API key required

**Limitation:**

- Less flexible than LLM-generated text

### H2 Database

**Advantages:**

- Simple setup
- No external database required
- Suitable for the project scope

**Limitation:**

- Not intended for production-scale workloads

### JSON Storage for Lists

Responsibilities and skills are stored as JSON strings.

This keeps the entity simple, but a production system could use normalized tables or database-supported JSON types.

## 15. Future Improvements

- LLM-powered generation
- Advanced ATS analysis
- User authentication
- Version history
- Collaborative editing
- Salary information
- Diversity and inclusion analysis
- Job board integrations
- PostgreSQL or another production database
- Cloud deployment

## 16. Conclusion

JD Studio provides an end-to-end workflow for creating, editing, analyzing, saving and exporting job descriptions.

The solution combines:

```text
React
+
Spring Boot
+
Template-Based Generation
+
ATS Keyword Analysis
+
H2 Persistence
+
PDF Export
```

The modular architecture keeps the frontend, generation logic and persistence layers separated, making the project easy to understand and extend.
