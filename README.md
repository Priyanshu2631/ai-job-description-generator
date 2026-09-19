# JD Studio — AI-Powered Job Description Generator

JD Studio is a full-stack web application that helps employers generate structured, professional and ATS-friendly job descriptions from basic hiring inputs.

## Features

- Multi-step job description creation
- Industry-aware JD generation
- Skill-based responsibilities and preferred skills
- Experience-level based content
- Company-culture based benefits
- Editable generated job descriptions
- Standard, Concise and Impact-focused variations
- Lightweight ATS keyword analysis
- Save and update job description drafts
- Copy JD to clipboard
- Export JD as PDF
- H2 database persistence
- REST APIs with Swagger documentation
- Backend tests and request validation

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios
- jsPDF

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- H2 Database
- Jakarta Validation
- Springdoc OpenAPI

## Architecture

```text
React Frontend
      │
      │ REST API
      ▼
Spring Boot Backend
      │
      ├── Generation Engine
      │
      └── Spring Data JPA
              │
              ▼
          H2 Database
```

## Project Structure

```text
ai-job-description-generator/
├── frontend/
├── jobdescription/
├── README.md
├── SOLUTION.md
└── .gitignore
```

## Getting Started

### Backend

```powershell
cd jobdescription
.\mvnw.cmd spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

### Frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

### Main API Endpoints

```text
POST /api/job-descriptions/generate
POST /api/job-descriptions/save
POST /api/job-descriptions/save-edited
GET  /api/job-descriptions
GET  /api/job-descriptions/{id}
```

## Generation Approach

The current application uses a deterministic, template-based generation engine.

Generation considers:

- Job title
- Industry
- Experience level
- Skills
- Company culture
- Special requirements

Industry-specific rules are included for areas such as FinTech, Healthcare, E-commerce, Education and Software/Technology.

The architecture can later be extended with an LLM-based generation system.

## ATS Analysis

JD Studio provides a lightweight keyword coverage score based on required skills, preferred skills, industry and experience level.

The score is a heuristic indicator and does not represent the scoring methodology of commercial ATS platforms.

## Testing

Run backend tests using:

```powershell
cd jobdescription
.\mvnw.cmd test
```

## Future Improvements

- LLM-powered generation
- Advanced ATS analysis
- User authentication
- Version history
- Collaborative editing
- Salary information
- Diversity and inclusion analysis
- Job board integrations
- Production database and deployment
