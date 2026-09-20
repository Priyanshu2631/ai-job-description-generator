# SOLUTION — PS8: AI-Powered Job Description Generator

## 1. Problem Understanding

The objective is to build a full-stack application that helps employers create structured and professional job descriptions from a small set of hiring inputs.

The employer provides:

- Job Title
- Industry
- Experience Level
- Key Skills
- Company Culture
- Special Requirements

The system then generates a structured job description containing:

- About the Role
- Responsibilities
- Required Skills
- Preferred Skills
- Experience
- What We Offer
- About the Company

The application also supports analysis, optimization, ATS keyword coverage, editing, persistence, version history and export.

---

## 2. Proposed Solution

JD Studio uses a React frontend and Spring Boot backend with Google Gemini as the AI generation, analysis and optimization engine.

```text
                    Employer
                       │
                       ▼
              ┌─────────────────┐
              │  React Frontend │
              └────────┬────────┘
                       │
                       │ REST API
                       ▼
              ┌─────────────────┐
              │ Spring Boot API │
              └────────┬────────┘
                       │
          ┌────────────┼─────────────┐
          │            │             │
          ▼            ▼             ▼
    ┌──────────┐ ┌───────────┐ ┌────────────┐
    │ JD       │ │ Gemini AI │ │ Version    │
    │ Service  │ │ Services  │ │ Management │
    └────┬─────┘ └─────┬─────┘ └──────┬─────┘
         │             │              │
         │             ▼              │
         │       ┌────────────┐       │
         │       │  Gemini    │       │
         │       │    API     │       │
         │       └────────────┘       │
         │                            │
         └────────────┬───────────────┘
                      ▼
               ┌─────────────┐
               │ H2 Database │
               └─────────────┘
```

The frontend is responsible for the user workflow, editing, variations, ATS display and export.

The backend is responsible for validation, REST APIs, business logic, AI integration and persistence.

---

## 3. AI-Powered Generation

The current primary generation workflow uses Google Gemini through Spring AI.

### Input

The generation request contains:

```text
Job Title
Industry
Experience Level
Skills
Company Culture
Special Requirements
```

### Processing

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

The generation prompt instructs the model to use the employer-provided information and avoid inventing unsupported salary, benefits, locations, technologies, certifications, policies or other employer-specific facts.

The response is converted into a structured DTO rather than returning unstructured text.

---

## 4. Structured AI Response

The generated response contains fields such as:

```text
jobTitle
aboutTheRole
responsibilities
requiredSkills
preferredSkills
experience
whatWeOffer
companyDescription
```

The application then combines the AI-generated content with the employer-provided metadata such as:

```text
industry
experienceLevel
companyCulture
specialRequirements
```

This keeps the generated content structured and editable.

---

## 5. AI Analysis

A saved job description can be analyzed using Gemini.

```text
Saved Job Description
        ↓
POST /{id}/analyze
        ↓
AiJobAnalysisService
        ↓
Google Gemini
        ↓
Structured Analysis Response
        ↓
AI Insights
```

The analysis feature provides structured feedback about the job description rather than requiring the user to manually inspect the entire document.

The backend uses a dedicated analysis DTO and parses the AI response into application data.

---

## 6. AI Optimization

The optimization workflow improves an existing job description while preserving its original meaning.

```text
Existing JD
    ↓
POST /{id}/optimize
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

The optimization prompt instructs Gemini to:

- Preserve the original meaning
- Improve clarity
- Improve professionalism
- Improve structure
- Improve ATS searchability
- Make responsibilities specific and action-oriented
- Avoid unsupported facts
- Avoid inventing benefits, salary, location or requirements
- Avoid introducing discriminatory requirements
- Return a complete structured response

The optimization response includes:

```text
optimizedAboutTheRole
optimizedResponsibilities
optimizedRequiredSkills
optimizedPreferredSkills
optimizedExperience
optimizedWhatWeOffer
optimizedCompanyDescription
changesMade
```

Users can review the proposed changes before applying them.

---

## 7. ATS Keyword Analysis

JD Studio provides a lightweight ATS-style analysis system.

It is intentionally implemented as a transparent heuristic rather than attempting to reproduce the proprietary algorithms of commercial ATS platforms.

### Keyword Sources

The system considers:

- Required Skills
- Preferred Skills
- Industry
- Experience Level
- Job Title

### Searchable Content

The skill lists themselves are not included in the searchable content when checking skill coverage.

This prevents every skill from automatically appearing as matched simply because it exists in the input list.

The searchable content includes:

- Job title
- About the Role
- Responsibilities
- Experience
- What We Offer
- Company Description
- Company Culture
- Special Requirements

### Coverage

The score is calculated from three components:

```text
Required Skill Coverage  → 60%
Preferred Skill Coverage → 20%
Role/Context Coverage    → 20%
```

Overall:

```text
ATS Score =
    Required Coverage × 0.60
  + Preferred Coverage × 0.20
  + Role Coverage × 0.20
```

The dashboard also shows:

- Matched keywords
- Missing keywords
- Required matched/missing
- Preferred matched/missing
- Improvement suggestions

---

## 8. Frontend Workflow

The frontend follows a four-stage creation workflow:

```text
Role
  ↓
Requirements
  ↓
Company
  ↓
Review
```

After the JD is generated, users can:

```text
Generate
   ↓
Review
   ↓
Edit
   ↓
Analyze
   ↓
Optimize
   ↓
Apply Changes
   ↓
Save
```

Additional actions include:

- Copy
- PDF export
- Duplicate
- Version history
- Restore

---

## 9. JD Variations

The interface provides three presentation styles:

### Standard

A complete, balanced version of the generated JD.

### Concise

A shorter presentation that reduces the amount of content shown in selected sections.

### Impact-focused

A presentation variation intended to emphasize impact-oriented content while using the generated JD as its source.

These variations are handled on the frontend and do not create independent database records until saved.

---

## 10. Draft Management

Saved job descriptions can be retrieved from the H2 database.

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
Save
```

Users can also:

- Search drafts
- Filter drafts by industry
- Open drafts
- Delete drafts
- Duplicate drafts

---

## 11. Version History

The application maintains a separate version record for important job-description changes.

Version records contain:

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

### Version Events

The current workflow records changes such as:

```text
Created
Edited
Duplicated
Restored from Version X
```

### Restore Workflow

```text
Version History
      ↓
Select Version
      ↓
Restore
      ↓
Current JD Updated
      ↓
New Restore Version Created
```

This preserves the history instead of silently replacing the previous state.

---

## 12. Duplicate Workflow

A saved JD can be duplicated.

```text
Existing JD
    ↓
Duplicate
    ↓
New JobDescription Entity
    ↓
New Database ID
    ↓
New Draft
```

The duplicated job description retains the original content but exists as a separate database record.

---

## 13. Backend Architecture

The backend follows a layered architecture.

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

Handles:

- HTTP requests
- Path variables
- Request bodies
- REST endpoint mapping
- Request validation

### DTO

Separates API request/response structures from persistence entities.

Examples include:

- `JobDescriptionRequest`
- `JobDescriptionResponse`
- `JobAnalysisResponse`
- `JobOptimizationResponse`

### Services

Business logic is separated into services for different responsibilities.

Important services include:

- `JobDescriptionService`
- `AiJobDescriptionService`
- `AiJobAnalysisService`
- `AiJobOptimizationService`

### Repository

Spring Data JPA repositories provide database access.

Repositories exist for:

- Job descriptions
- Job description versions

### Entities

The main persistence models are:

- `JobDescription`
- `JobDescriptionVersion`

---

## 14. REST API

### AI Generation

```http
POST /api/job-descriptions/generate-ai
```

Generates a job description using Gemini.

### Legacy Generation

```http
POST /api/job-descriptions/generate
```

A legacy deterministic generation endpoint retained for compatibility.

### Save

```http
POST /api/job-descriptions/save
POST /api/job-descriptions/save-edited
```

### Retrieve

```http
GET /api/job-descriptions
GET /api/job-descriptions/{id}
```

### Update

```http
PUT /api/job-descriptions/{id}
```

### AI Analysis

```http
POST /api/job-descriptions/{id}/analyze
```

### AI Optimization

```http
POST /api/job-descriptions/{id}/optimize
```

### Duplicate

```http
POST /api/job-descriptions/{id}/duplicate
```

### Version History

```http
GET /api/job-descriptions/{id}/versions

GET /api/job-descriptions/{id}/versions/{versionId}

POST /api/job-descriptions/{id}/versions/{versionId}/restore
```

### Delete

```http
DELETE /api/job-descriptions/{id}
```

---

## 15. Validation

The backend uses Jakarta Validation for generation requests.

Required fields are:

```text
Job Title
Industry
Experience Level
At least one Skill
Company Culture
```

Special requirements are optional.

Validation prevents incomplete requests from reaching the generation layer.

---

## 16. Database Design

### Job Descriptions

The `job_descriptions` table stores the current state.

Important fields:

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

### Versions

The `job_description_versions` table stores historical snapshots.

A version references the corresponding job description through:

```text
jobDescriptionId
```

Version numbers are maintained per job description.

---

## 17. JSON Storage

Responsibilities and skill lists are stored as JSON strings in the database.

For example:

```json
[
  "Java",
  "Spring Boot",
  "REST APIs"
]
```

This keeps the initial entity design simple and avoids multiple relationship tables.

For a production system with more complex querying, these fields could be normalized or stored using database-native JSON support.

---

## 18. Gemini Configuration

The application uses Spring AI's Google Gemini integration.

The main configuration is:

```properties
spring.ai.google.genai.api-key=${GEMINI_API_KEY}
spring.ai.google.genai.chat.model=gemini-3.6-flash
```

The API key is provided through an environment variable rather than being stored directly in source code.

Windows PowerShell:

```powershell
$env:GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Persistent Windows user variable:

```powershell
[System.Environment]::SetEnvironmentVariable(
    "GEMINI_API_KEY",
    "YOUR_GEMINI_API_KEY",
    "User"
)
```

A new terminal/IDE session should be started after setting the persistent variable.

---

## 19. Error Handling

The application handles common failure scenarios including:

- Invalid API keys
- Gemini quota exhaustion
- AI response parsing errors
- Missing saved JD IDs
- Invalid requests
- Backend API failures

AI services use raw model content with explicit JSON parsing where necessary.

This approach provides greater control over malformed or incomplete model responses than relying entirely on automatic structured-output conversion.

The frontend also surfaces useful backend error messages when available.

---

## 20. Testing

Backend tests use Spring Boot Test and JUnit.

Run:

```powershell
cd jobdescription
.\mvnw.cmd test
```

Existing tests cover core backend behavior such as:

- Application context loading
- Job description generation
- Generated content structure
- Required skills
- Industry-specific behavior

The AI endpoints depend on an external Gemini API and therefore should also be tested through integration/manual workflow testing when valid API access and quota are available.

---

## 21. Design Trade-offs

### Gemini vs Deterministic Generation

Gemini provides more flexible and natural job-description language than a fixed template system.

Trade-offs include:

**Advantages**

- More natural language
- Better contextual generation
- AI-powered analysis
- AI-powered optimization
- Flexible content generation

**Limitations**

- Requires an API key
- Subject to API availability and quota
- Requires handling model-output parsing
- Adds an external service dependency

A legacy deterministic generation endpoint is retained for compatibility.

---

### H2 Database

**Advantages**

- Very simple local setup
- No separate database server
- Good for development and demonstration

**Limitations**

- Not intended as the final database for production-scale workloads
- File-based local storage requires appropriate deployment configuration

A production deployment could use PostgreSQL or another managed relational database.

---

### JSON Storage

**Advantages**

- Simple entity model
- Easy persistence of list fields
- Low initial implementation complexity

**Limitations**

- Less convenient for relational querying
- Validation/querying of individual list elements is more limited

A production implementation could normalize these relationships.

---

### Heuristic ATS

**Advantages**

- Transparent
- Explainable
- Easy to implement
- Easy to test
- No dependency on proprietary ATS algorithms

**Limitation**

It does not represent the exact scoring system used by commercial ATS platforms.

---

## 22. Security Considerations

The current application is designed primarily for local/demo usage.

Important considerations include:

- API keys must not be committed to Git
- Gemini keys should be supplied through environment variables
- Authentication is not currently implemented
- Authorization is not currently implemented
- CORS is configured for the local frontend
- Production deployment should use HTTPS
- Production secrets should be managed using a secure secret-management solution

---

## 23. Current End-to-End Flow

The complete workflow is:

```text
                Employer Inputs
                      │
                      ▼
               React Generator
                      │
                      ▼
              Gemini Generation
                      │
                      ▼
               Generated JD
                      │
          ┌───────────┼────────────┐
          │           │            │
          ▼           ▼            ▼
        Edit        ATS          Analyze
          │        Analysis         │
          │           │             ▼
          │           │          AI Insights
          │           │
          └──────┬────┘
                 ▼
             Optimize
                 │
                 ▼
          Review Changes
                 │
                 ▼
          Apply Optimization
                 │
                 ▼
               Save
                 │
                 ▼
           Version History
            │          │
            ▼          ▼
          Restore    Duplicate
            │
            ▼
          Export PDF
```

---

## 24. Future Improvements

Potential future extensions include:

- User authentication
- Role-based authorization
- PostgreSQL production database
- Cloud deployment
- Advanced semantic ATS analysis
- Job board integrations
- Collaborative editing
- Candidate-facing JD previews
- Analytics and reporting
- Configurable AI generation controls
- Automated integration tests for Gemini workflows
- Better observability and centralized logging
- Rate-limit and quota-aware retry handling

---

## 25. Conclusion

JD Studio provides a complete workflow for generating and managing professional job descriptions.

The solution combines:

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

The application separates presentation, REST APIs, business logic, AI services and persistence into modular components.

This makes JD Studio suitable as a full-stack demonstration project while leaving clear paths for future improvements such as authentication, production database infrastructure, cloud deployment and more advanced AI/ATS capabilities.
