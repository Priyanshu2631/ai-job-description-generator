package com.wevolve.jobdescription.service;

import com.wevolve.jobdescription.dto.JobAnalysisResponse;
import com.wevolve.jobdescription.model.JobDescription;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class AiJobAnalysisService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public AiJobAnalysisService(
            ChatClient.Builder chatClientBuilder,
            ObjectMapper objectMapper) {

        this.chatClient = chatClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public JobAnalysisResponse analyzeJobDescription(
            JobDescription jobDescription) {

        String prompt = """
                You are an expert in recruitment, applicant tracking systems,
                technical hiring, and professional job descriptions.

                Analyze the following job description.

                IMPORTANT RULES:

                1. Analyze ONLY the information present in the job description.
                2. Do not invent company facts or requirements.
                3. Do not assume salary, benefits, location, or policies.
                4. Be objective and practical.
                5. Do not discriminate against candidates.
                6. ATS score should reflect clarity, structure, relevant
                   terminology, and searchability of the job description.
                7. Skill coverage should reflect whether the stated skills
                   adequately represent the responsibilities of the role.
                8. Clarity should reflect readability, specificity,
                   organization, and lack of ambiguity.
                9. Scores must be integers between 0 and 100.
                10. If there are no issues in a category, return an empty array.
                11. Return ONLY valid JSON.
                12. Do NOT use Markdown.
                13. Do NOT wrap the JSON in ```json or ```.

                Return exactly this JSON structure:

                {
                  "atsScore": 0,
                  "skillCoverageScore": 0,
                  "clarityScore": 0,
                  "missingInformation": [],
                  "keywordSuggestions": [],
                  "improvementSuggestions": [],
                  "potentialIssues": []
                }

                JOB DESCRIPTION:

                Job Title:
                %s

                About the Role:
                %s

                Responsibilities:
                %s

                Required Skills:
                %s

                Preferred Skills:
                %s

                Experience:
                %s

                What We Offer:
                %s

                Company Description:
                %s

                Company Culture:
                %s

                Special Requirements:
                %s
                """.formatted(
                safe(jobDescription.getJobTitle()),
                safe(jobDescription.getAboutTheRole()),
                safe(jobDescription.getResponsibilities()),
                safe(jobDescription.getRequiredSkills()),
                safe(jobDescription.getPreferredSkills()),
                safe(jobDescription.getExperience()),
                safe(jobDescription.getWhatWeOffer()),
                safe(jobDescription.getCompanyDescription()),
                safe(jobDescription.getCompanyCulture()),
                safe(jobDescription.getSpecialRequirements())
        );

        String rawResponse = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        if (rawResponse == null || rawResponse.isBlank()) {
            throw new RuntimeException(
                    "Gemini returned an empty analysis response."
            );
        }

        String json = extractJson(rawResponse);

        try {
            return objectMapper.readValue(
                    json,
                    JobAnalysisResponse.class
            );
        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to parse Gemini analysis response: " + json,
                    e
            );
        }
    }

    private String extractJson(String response) {

        String cleaned = response.trim();

        if (cleaned.startsWith("```json")) {
            cleaned = cleaned.substring(7);
        } else if (cleaned.startsWith("```")) {
            cleaned = cleaned.substring(3);
        }

        if (cleaned.endsWith("```")) {
            cleaned = cleaned.substring(
                    0,
                    cleaned.length() - 3
            );
        }

        cleaned = cleaned.trim();

        int start = cleaned.indexOf('{');
        int end = cleaned.lastIndexOf('}');

        if (start == -1 || end == -1 || start > end) {
            throw new RuntimeException(
                    "Gemini did not return valid JSON. Response: "
                            + response
            );
        }

        return cleaned.substring(start, end + 1);
    }

    private String safe(Object value) {

        if (value == null) {
            return "Not provided";
        }

        return value.toString();
    }
}