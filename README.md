# JD Studio — AI-Powered Job Description Generator

JD Studio is a full-stack web application that helps employers create structured, professional and ATS-friendly job descriptions from a small set of hiring inputs.

The application combines a React frontend, Spring Boot backend, Google Gemini AI, H2 persistence, AI-powered analysis and optimization, lightweight ATS keyword analysis, version history, and PDF export.

---

## Features

### AI-Powered JD Generation
Generate a complete job description using:

- Job Title
- Industry
- Experience Level
- Key Skills
- Company Culture
- Special Requirements

Gemini generates the core job-description content while the application preserves the employer-provided context.

### AI Job Description Analysis
Analyze a saved JD using Gemini to obtain structured feedback about the quality and effectiveness of the description.

### AI Job Description Optimization
Optimize an existing JD with Gemini while preserving its original meaning and avoiding unsupported additions.

The optimization workflow provides:

- Optimized role description
- Optimized responsibilities
- Optimized required skills
- Optimized preferred skills
- Optimized experience requirements
- Optimized company description
- Changes made

Users can review the optimized version before applying it.

### ATS Keyword Analysis
JD Studio provides a lightweight ATS-style keyword coverage analysis.

It checks the job description against:

- Required skills
- Preferred skills
- Industry
- Experience level
- Job title

The dashboard provides:

- Overall coverage score
- Required skill coverage
- Preferred skill coverage
- Role/context coverage
- Matched keywords
- Missing keywords
- Improvement suggestions

> The ATS score is a heuristic keyword-coverage indicator. It does not reproduce the proprietary scoring methodology of commercial ATS platforms.

### Draft Management

Users can:

- Save job descriptions
- Open existing drafts
- Edit saved descriptions
- Delete drafts
- Duplicate existing descriptions

### Version History

The application maintains versions of job descriptions for important changes such as:

- Created
- Edited
- Duplicated
- Restored

Users can inspect previous versions and restore an earlier version.

### Editing & Export

Users can:

- Edit generated content
- Add/remove responsibilities and skills
- Copy the complete JD to the clipboard
- Export the JD as a PDF

### JD Variations

The frontend provides multiple presentation styles:

- Standard
- Concise
- Impact-focused

These variations are generated from the generated JD while preserving the underlying role information.

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- jsPDF

### Backend

- Java 21
- Spring Boot 4.1.1
- Spring Data JPA
- Spring AI 2.0.0
- Google Gemini
- H2 Database
- Jakarta Validation
- Springdoc OpenAPI / Swagger

---

## Architecture

```text
                         ┌──────────────────────┐
                         │      React UI        │
                         │      + Vite          │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │   Spring Boot API    │
                         │    Controllers       │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
             ┌────────────┐ ┌──────────────┐ ┌─────────────┐
             │ JD Service │ │ Gemini AI     │ │ Version     │
             │            │ │ Services      │ │ Management  │
             └─────┬──────┘ └──────┬───────┘ └──────┬──────┘
                   │               │                │
                   │               ▼                │
                   │       ┌──────────────┐         │
                   │       │ Google       │         │
                   │       │ Gemini API   │         │
                   │       └──────────────┘         │
                   │                                │
                   └───────────────┬────────────────┘
                                   ▼
                         ┌──────────────────────┐
                         │       H2 Database    │
                         └──────────────────────┘
```

---

## AI Workflow

### Generation

```text
Employer Input
      ↓
React Frontend
      ↓
POST /api/job-descriptions/generate-ai
      ↓
Spring Boot
      ↓
AiJobDescriptionService
      ↓
Google Gemini
      ↓
Structured JobDescriptionResponse
      ↓
React Editor
```

### Analysis

```text
Saved Job Description
        ↓
POST /api/job-descriptions/{id}/analyze
        ↓
AiJobAnalysisService
        ↓
Google Gemini
        ↓
Structured Analysis Response
        ↓
AI Insights Dashboard
```

### Optimization

```text
Saved Job Description
        ↓
POST /api/job-descriptions/{id}/optimize
        ↓
AiJobOptimizationService
        ↓
Google Gemini
        ↓
Structured Optimization Response
        ↓
Review Changes
        ↓
Apply Changes
        ↓
Edit / Save
```

---

## Project Structure

```text
ai-job-description-generator/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── GeneratorPanel.jsx
│   │   │   ├── JobActions.jsx
│   │   │   ├── JobDescriptionEditor.jsx
│   │   │   ├── AIInsights.jsx
│   │   │   └── VersionHistory.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useJobDescription.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── jobdescription/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/wevolve/jobdescription/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   └── mvnw.cmd
│
├── README.md
├── SOLUTION.md
└── .gitignore
```

---

## Backend Configuration

The backend uses H2 for local persistence.

```properties
spring.datasource.url=jdbc:h2:file:./data/jobdescriptiondb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.ai.google.genai.api-key=${GEMINI_API_KEY}
spring.ai.google.genai.chat.model=gemini-3.6-flash
```

### Gemini API Key

The API key should be provided through an environment variable.

Windows PowerShell:

```powershell
$env:GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

For a persistent Windows user environment variable:

```powershell
[System.Environment]::SetEnvironmentVariable(
    "GEMINI_API_KEY",
    "YOUR_GEMINI_API_KEY",
    "User"
)
```

Restart the terminal/IDE after setting a persistent environment variable.

> Never commit a real Gemini API key to GitHub.

---

## Getting Started

### Prerequisites

Install:

- Java 21
- Node.js and npm
- Git
- A Gemini API key with available API quota

---

## Run the Backend

Open a terminal:

```powershell
cd jobdescription
.\mvnw.cmd spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

## Run the Frontend

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

---

## Swagger API Documentation

Once the backend is running:

```text
http://localhost:8080/swagger-ui/index.html
```

---

## H2 Console

The H2 console is available at:

```text
http://localhost:8080/h2-console
```

Database URL:

```text
jdbc:h2:file:./data/jobdescriptiondb
```

Username:

```text
sa
```

Password:

```text
```

---

## REST API

### Generation

```http
POST /api/job-descriptions/generate
```

Legacy/deterministic generation endpoint retained for compatibility.

```http
POST /api/job-descriptions/generate-ai
```

Gemini-powered job description generation.

### Job Descriptions

```http
GET    /api/job-descriptions
GET    /api/job-descriptions/{id}
PUT    /api/job-descriptions/{id}
POST   /api/job-descriptions/save
POST   /api/job-descriptions/save-edited
DELETE /api/job-descriptions/{id}
```

### AI

```http
POST /api/job-descriptions/{id}/analyze
POST /api/job-descriptions/{id}/optimize
```

### Duplicate

```http
POST /api/job-descriptions/{id}/duplicate
```

### Version History

```http
GET  /api/job-descriptions/{id}/versions
GET  /api/job-descriptions/{id}/versions/{versionId}

POST /api/job-descriptions/{id}/versions/{versionId}/restore
```

---

## Validation

The job description request validates the core hiring inputs.

Required fields include:

- Job Title
- Industry
- Experience Level
- At least one Skill
- Company Culture

Special requirements are optional.

Jakarta Validation is used on the backend to prevent incomplete requests from reaching the generation layer.

---

## Data Model

### JobDescription

Stores the current job description.

Main fields include:

```text
id
jobTitle
industry
experienceLevel
aboutTheRole
responsibilities
requiredSkills
preferredSkills
experience
whatWeOffer
companyDescription
companyCulture
specialRequirements
```

List-based fields are stored as JSON strings in the H2 database and converted to arrays for the frontend.

### JobDescriptionVersion

Stores snapshots of job descriptions.

Important fields include:

```text
id
jobDescriptionId
versionNumber
changeType
createdAt
jobTitle
industry
experienceLevel
aboutTheRole
responsibilities
requiredSkills
preferredSkills
experience
whatWeOffer
companyDescription
companyCulture
specialRequirements
```

---

## Testing

Backend tests use Spring Boot Test and JUnit.

Run:

```powershell
cd jobdescription
.\mvnw.cmd test
```

The test suite covers the existing backend generation/business logic and application behavior.

---

## Typical User Workflow

```text
Enter Hiring Requirements
          ↓
Generate with Gemini
          ↓
Review Generated JD
          ↓
Edit if Required
          ↓
Run ATS Analysis
          ↓
Save JD
          ↓
Run AI Analysis
          ↓
Run AI Optimization
          ↓
Review Changes
          ↓
Apply Optimization
          ↓
Save
          ↓
Version History
          ↓
Export / Copy / Duplicate
```

---

## Design Decisions

### Google Gemini

Gemini is used for natural-language generation, analysis and optimization.

The application keeps AI output constrained by structured response DTOs and prompts designed to avoid unsupported job requirements or invented employer information.

### H2

H2 provides a lightweight local database without requiring a separate database server.

This is convenient for development and demonstration.

For production deployment, PostgreSQL or another production database would be more appropriate.

### JSON Storage for Lists

Responsibilities and skill lists are stored as JSON strings within the entity.

This keeps the initial data model simple.

A production implementation could use normalized relational tables or database-native JSON support depending on query requirements.

### Heuristic ATS Analysis

The ATS feature deliberately uses transparent keyword coverage rather than claiming to replicate commercial ATS algorithms.

This makes the score explainable and easy to inspect.

---

## Error Handling

The application handles common AI and API failures including:

- Invalid API credentials
- Gemini quota exhaustion
- AI response parsing failures
- Backend request errors
- Missing job-description IDs
- Invalid/incomplete requests

The frontend displays backend error messages where available so that API failures are easier to diagnose.

---

## Security Notes

- Gemini API keys must be supplied through environment variables.
- API keys must not be committed to source control.
- The current application is intended primarily for local/demo use.
- Authentication and authorization are not currently implemented.
- CORS is currently configured for the local Vite frontend.

---

## Future Improvements

Potential extensions include:

- User authentication and authorization
- PostgreSQL production deployment
- Cloud deployment
- Advanced ATS semantic analysis
- Job board integrations
- Collaborative editing
- Candidate-facing previews
- Analytics dashboards
- More configurable AI generation controls
- Automated test coverage for AI endpoints
- Production-grade observability and logging

---

## Conclusion

JD Studio provides an end-to-end workflow for creating and managing professional job descriptions.

The current system combines:

```text
React
+
Spring Boot
+
Google Gemini
+
Spring AI
+
H2
+
ATS Keyword Analysis
+
AI Analysis
+
AI Optimization
+
Version History
+
PDF Export
```

The modular architecture separates the frontend, REST API, business logic, AI services and persistence layer, making the project straightforward to develop, test and extend.
