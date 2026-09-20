# JD Studio — AI-Powered Job Description Generator

JD Studio is a full-stack web application that helps employers create professional, structured and ATS-friendly job descriptions from simple hiring inputs.

It combines a React frontend, Spring Boot backend, Google Gemini, H2 persistence, AI analysis and optimization, ATS keyword analysis, version history and PDF export.

## Features

- **AI Job Description Generation** — Generate complete JDs from job title, industry, experience, skills, company culture and requirements.
- **AI Analysis** — Get structured feedback on a saved job description using Gemini.
- **AI Optimization** — Improve an existing JD while preserving its original meaning and employer-provided information.
- **ATS Keyword Analysis** — Check keyword coverage, matched/missing skills and improvement suggestions.
- **Draft Management** — Save, edit, open, delete and duplicate job descriptions.
- **Version History** — View and restore previous versions.
- **JD Variations** — Generate Standard, Concise and Impact-focused versions.
- **Export & Copy** — Copy the complete JD or export it as PDF.

> **Note:** The ATS score is a heuristic keyword-coverage indicator and does not reproduce the proprietary scoring methods of commercial ATS platforms.

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios
- jsPDF

**Backend**
- Java 21
- Spring Boot 4.1.1
- Spring Data JPA
- Spring AI 2.0.0
- Google Gemini
- H2 Database
- Jakarta Validation
- Springdoc OpenAPI / Swagger

## Architecture

```text
React + Vite
     │
     │ REST API
     ▼
Spring Boot
     │
 ┌───┼───────────────┐
 ▼   ▼               ▼
JD  Gemini AI    Version
Service Services  Management
 │   │               │
 └───┼───────────────┘
     ▼
 H2 Database
```

## AI Workflow

### Generation

```text
Hiring Inputs
     ↓
React Frontend
     ↓
Spring Boot API
     ↓
Gemini
     ↓
Structured JD
     ↓
React Editor
```

### Analysis & Optimization

```text
Saved JD
   ↓
Spring Boot
   ↓
Gemini
   ↓
Analysis / Optimization
   ↓
Review Changes
   ↓
Apply & Save
```

## Project Structure

```text
JD Studio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── jobdescription/
│   ├── src/main/java/com/wevolve/jobdescription/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   ├── src/main/resources/
│   └── pom.xml
│
├── README.md
├── SOLUTION.md
└── .gitignore
```

## Getting Started

### Prerequisites

- Java 21
- Node.js and npm
- Git
- Gemini API key with available quota

### 1. Configure Gemini

Set the API key as an environment variable.

**Windows PowerShell:**

```powershell
$env:GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Never commit a real API key to GitHub.

### 2. Run Backend

```powershell
cd jobdescription
.\mvnw.cmd spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### 3. Run Frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## API

### Job Descriptions

```text
GET    /api/job-descriptions
GET    /api/job-descriptions/{id}
PUT    /api/job-descriptions/{id}
POST   /api/job-descriptions/save
POST   /api/job-descriptions/save-edited
DELETE /api/job-descriptions/{id}
POST   /api/job-descriptions/{id}/duplicate
```

### AI

```text
POST /api/job-descriptions/generate-ai
POST /api/job-descriptions/{id}/analyze
POST /api/job-descriptions/{id}/optimize
```

### Version History

```text
GET  /api/job-descriptions/{id}/versions
GET  /api/job-descriptions/{id}/versions/{versionId}
POST /api/job-descriptions/{id}/versions/{versionId}/restore
```

Swagger documentation:

```text
http://localhost:8080/swagger-ui/index.html
```

## Database

JD Studio uses H2 for lightweight local persistence.

```text
Database: H2
URL: jdbc:h2:file:./data/jobdescriptiondb
Username: sa
Password: empty
```

H2 Console:

```text
http://localhost:8080/h2-console
```

For production deployment, PostgreSQL or another production database would be more appropriate.

## Testing

Run backend tests with:

```powershell
cd jobdescription
.\mvnw.cmd test
```

## Security

- Gemini API keys are supplied through environment variables.
- API keys should never be committed to source control.
- Authentication and authorization are not currently implemented.
- The application is primarily intended for local/demo use.

## Future Improvements

- User authentication and authorization
- PostgreSQL production deployment
- Cloud deployment
- Advanced ATS semantic analysis
- Job board integrations
- Collaborative editing
- Analytics dashboards
- Expanded AI generation controls
- Additional automated tests
- Production-grade logging and observability
