# SOLUTION — PS8: AI-Powered Job Description Generator

## 1. Problem Understanding

JD Studio is a full-stack application that helps employers create structured, professional job descriptions from a small set of hiring inputs.

### Employer Inputs

- Job Title
- Industry
- Experience Level
- Key Skills
- Company Culture
- Special Requirements

### Generated Content

- About the Role
- Responsibilities
- Required Skills
- Preferred Skills
- Experience
- What We Offer
- About the Company

The application also supports AI analysis and optimization, ATS keyword analysis, editing, persistence, version history, duplication and PDF export.

---

## 2. Proposed Solution

JD Studio uses React, Spring Boot, Spring AI and Google Gemini.

```text
                         Employer
                            │
                            ▼
                    ┌────────────────┐
                    │ React Frontend │
                    └───────┬────────┘
                            │ REST API
                            ▼
                    ┌────────────────┐
                    │ Spring Boot API│
                    └───────┬────────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
        ┌─────────┐   ┌───────────┐   ┌──────────┐
        │ JD      │   │ Gemini AI │   │ Version  │
        │ Service │   │ Services  │   │Management│
        └────┬────┘   └─────┬─────┘   └────┬─────┘
             │              ▼              │
             │       ┌────────────┐        │
             │       │ Gemini API │        │
             │       └────────────┘        │
             └──────────────┬──────────────┘
                            ▼
                     ┌─────────────┐
                     │ H2 Database │
                     └─────────────┘
```

The frontend handles the user workflow, editing, variations, ATS display and export. The backend handles validation, REST APIs, business logic, AI integration and persistence.

---

## 3. AI Generation

The primary generation workflow uses Google Gemini through Spring AI.

```text
User Input
   ↓
JobDescriptionRequest
   ↓
Spring Boot Controller
   ↓
AiJobDescriptionService
   ↓
Spring AI ChatClient
   ↓
Google Gemini
   ↓
Structured JobDescriptionResponse
   ↓
React Frontend
```

The prompt instructs Gemini to use employer-provided information and avoid inventing unsupported salary, benefits, locations, technologies, certifications or other employer-specific facts.

The response is converted into a structured DTO, making the generated JD easy to edit and persist.

---

## 4. AI Analysis & Optimization

### AI Analysis

A saved JD can be analyzed using Gemini.

```text
Saved JD
   ↓
/{id}/analyze
   ↓
AiJobAnalysisService
   ↓
Google Gemini
   ↓
Structured Analysis
   ↓
AI Insights
```

The analysis provides structured feedback instead of requiring the user to manually inspect the entire document.

### AI Optimization

Optimization improves an existing JD while preserving its original meaning.

```text
Existing JD
   ↓
/{id}/optimize
   ↓
AiJobOptimizationService
   ↓
Google Gemini
   ↓
Optimization Response
   ↓
Review Changes
   ↓
Apply Changes
   ↓
Edit / Save
```

The optimization process focuses on:

- Clearer and more professional language
- Better structure and ATS searchability
- Specific, action-oriented responsibilities
- Preserving the original meaning
- Avoiding unsupported requirements, salary, benefits or location
- Avoiding discriminatory requirements

Users review the proposed changes before applying them.

---

## 5. ATS Keyword Analysis

JD Studio includes a transparent heuristic ATS-style analysis rather than attempting to reproduce proprietary ATS algorithms.

### Keyword Sources

- Required Skills
- Preferred Skills
- Industry
- Experience Level
- Job Title

The searchable content includes the job title, role description, responsibilities, experience, company information, culture and special requirements.

The skill lists themselves are excluded from searchable content so that a skill is not automatically counted as matched simply because it was entered as an input.

### Score

```text
Required Skill Coverage  → 60%
Preferred Skill Coverage → 20%
Role/Context Coverage    → 20%

ATS Score =
    Required Coverage × 0.60
  + Preferred Coverage × 0.20
  + Role Coverage × 0.20
```

The dashboard shows matched keywords, missing keywords and improvement suggestions.

---

## 6. Frontend Workflow

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
Edit
 ↓
Analyze
 ↓
Optimize
 ↓
Review Changes
 ↓
Apply & Save
```

Additional actions include:

- Copy
- PDF export
- Duplicate
- Version history
- Restore

### JD Variations

The frontend provides:

- **Standard** — complete balanced presentation
- **Concise** — shorter presentation
- **Impact-focused** — emphasizes impact-oriented content

These variations are generated from the existing JD and do not create separate database records until saved.

---

## 7. Drafts & Version History

Saved JDs can be opened, edited, deleted and duplicated.

```text
Generate → Save → Open → Edit → Save
```

The application maintains separate version records for important changes such as:

- Created
- Edited
- Duplicated
- Restored

### Restore

```text
Version History
      ↓
Select Version
      ↓
Restore
      ↓
Current JD Updated
      ↓
New Restore Version
```

This preserves previous states instead of silently replacing history.

---

## 8. Backend Architecture

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
H2 Database
```

### Controllers
Handle HTTP requests, request bodies, path variables, endpoint mapping and validation.

### DTOs
Separate API request/response structures from persistence entities.

Examples:

- `JobDescriptionRequest`
- `JobDescriptionResponse`
- `JobAnalysisResponse`
- `JobOptimizationResponse`

### Services

- `JobDescriptionService`
- `AiJobDescriptionService`
- `AiJobAnalysisService`
- `AiJobOptimizationService`

### Repositories

Spring Data JPA repositories provide access to job descriptions and their versions.

### Main Entities

- `JobDescription`
- `JobDescriptionVersion`

---

## 9. REST API

### Generation

```http
POST /api/job-descriptions/generate-ai
```

Gemini-powered generation.

```http
POST /api/job-descriptions/generate
```

Legacy deterministic generation endpoint retained for compatibility.

### Job Descriptions

```http
GET    /api/job-descriptions
GET    /api/job-descriptions/{id}
PUT    /api/job-descriptions/{id}
POST   /api/job-descriptions/save
POST   /api/job-descriptions/save-edited
DELETE /api/job-descriptions/{id}
POST   /api/job-descriptions/{id}/duplicate
```

### AI

```http
POST /api/job-descriptions/{id}/analyze
POST /api/job-descriptions/{id}/optimize
```

### Version History

```http
GET  /api/job-descriptions/{id}/versions
GET  /api/job-descriptions/{id}/versions/{versionId}
POST /api/job-descriptions/{id}/versions/{versionId}/restore
```

---

## 10. Validation & Database

### Validation

Generation requests require:

- Job Title
- Industry
- Experience Level
- At least one Skill
- Company Culture

Special requirements are optional.

Jakarta Validation prevents incomplete requests from reaching the generation layer.

### Database

H2 stores the current JD and version history.

Important `JobDescription` fields include:

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

Responsibilities and skill lists are stored as JSON strings to keep the initial data model simple.

---

## 11. Gemini Configuration

Spring AI is configured to use Google Gemini:

```properties
spring.ai.google.genai.api-key=${GEMINI_API_KEY}
spring.ai.google.genai.chat.model=gemini-3.6-flash
```

The API key is supplied through an environment variable:

```powershell
$env:GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

A real API key must never be committed to source control.

---

## 12. Error Handling

The application handles common failures including:

- Invalid API credentials
- Gemini quota exhaustion
- AI response parsing errors
- Missing JD IDs
- Invalid requests
- Backend API failures

AI services use explicit JSON parsing where necessary to handle malformed or incomplete model responses.

The frontend surfaces useful backend error messages when available.

---

## 13. Testing

Backend tests use Spring Boot Test and JUnit.

```powershell
cd jobdescription
.\mvnw.cmd test
```

Existing tests cover core backend behavior such as application context loading, generation and generated content structure.

AI endpoints also require manual/integration testing with valid Gemini API access and quota.

---

## 14. Design Trade-offs

### Gemini

**Advantages**
- Natural language generation
- Context-aware content
- AI analysis and optimization
- Flexible generation

**Trade-offs**
- Requires API key and quota
- External service dependency
- Model-output parsing is required

A deterministic generation endpoint is retained for compatibility.

### H2

H2 provides simple local persistence without requiring a separate database server. For production deployment, PostgreSQL or another managed relational database would be more appropriate.

### JSON Storage

JSON storage keeps the initial entity model simple. A production system could normalize list relationships or use database-native JSON support for more advanced querying.

### Heuristic ATS

The ATS system is transparent and explainable, but it does not represent the exact scoring system used by commercial ATS platforms.

---

## 15. Security

The current application is primarily intended for local/demo usage.

- API keys must not be committed to Git.
- Gemini keys are supplied through environment variables.
- Authentication and authorization are not currently implemented.
- CORS is configured for the local frontend.
- Production deployment should use HTTPS and secure secret management.

---

## 16. End-to-End Flow

```text
Employer Inputs
      ↓
React Generator
      ↓
Gemini Generation
      ↓
Generated JD
      ↓
 ┌────┼─────────┐
 ▼    ▼         ▼
Edit  ATS     Analyze
      Analysis   ↓
                 AI Insights
 └────┬──────────┘
      ↓
   Optimize
      ↓
Review Changes
      ↓
Apply Optimization
      ↓
Save
      ↓
Version History
   ┌──┴──┐
   ▼     ▼
Restore Duplicate
   │
   ▼
Export PDF
```

---

## 17. Future Improvements

- User authentication and role-based authorization
- PostgreSQL production deployment
- Cloud deployment
- Advanced semantic ATS analysis
- Job board integrations
- Collaborative editing
- Candidate-facing previews
- Analytics and reporting
- More configurable AI controls
- Expanded Gemini integration tests
- Centralized logging and observability
- Rate-limit and quota-aware retries

---

## 18. Conclusion

JD Studio provides an end-to-end workflow for generating and managing professional job descriptions.

```text
React
  +
Spring Boot
  +
Spring AI
  +
Google Gemini
  +
H2
  +
ATS Analysis
  +
AI Analysis
  +
AI Optimization
  +
Version History
  +
PDF Export
```

The modular separation of frontend, REST APIs, business logic, AI services and persistence makes JD Studio a strong full-stack demonstration project with clear paths for future production improvements.
