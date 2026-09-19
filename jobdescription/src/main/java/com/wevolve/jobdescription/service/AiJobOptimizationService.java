package com.wevolve.jobdescription.service;

import com.wevolve.jobdescription.dto.JobOptimizationResponse;
import com.wevolve.jobdescription.model.JobDescription;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class AiJobOptimizationService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public AiJobOptimizationService(
            ChatClient.Builder chatClientBuilder,
            ObjectMapper objectMapper) {

        this.chatClient = chatClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public JobOptimizationResponse optimizeJobDescription(
            JobDescription jobDescription) {

        String prompt = """
                You are an expert in recruitment, applicant tracking systems,
                technical hiring, and professional job descriptions.

                Optimize the following job description.

                IMPORTANT RULES:

                1. Preserve the original meaning of the job description.
                2. Do not invent company facts, benefits, salary, location,
                   technologies, certifications, policies, or requirements.
                3. Improve clarity, professionalism, structure, and ATS
                   searchability.
                4. Make responsibilities specific and action-oriented.
                5. Improve skill terminology only when supported by the
                   existing job description.
                6. Do not add requirements that were not present.
                7. Keep the role appropriate for the stated experience level.
                8. Do not introduce discriminatory requirements.
                9. Return the complete optimized version.
                10. List the important improvements in changesMade.
                11. Return ONLY valid JSON.
                12. Do not return Markdown.
                13. Do not wrap the JSON in ```json or ``` blocks.
                14. Complete every field before ending the response.
                15. Do not truncate the response.

                The JSON must contain exactly these fields:

                {
                  "optimizedAboutTheRole": "",
                  "optimizedResponsibilities": [],
                  "optimizedRequiredSkills": [],
                  "optimizedPreferredSkills": [],
                  "optimizedExperience": "",
                  "optimizedWhatWeOffer": [],
                  "optimizedCompanyDescription": "",
                  "changesMade": []
                }

                ORIGINAL JOB DESCRIPTION:

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
                """.formatted(
                safe(jobDescription.getJobTitle()),
                safe(jobDescription.getAboutTheRole()),
                safe(jobDescription.getResponsibilities()),
                safe(jobDescription.getRequiredSkills()),
                safe(jobDescription.getPreferredSkills()),
                safe(jobDescription.getExperience()),
                safe(jobDescription.getWhatWeOffer()),
                safe(jobDescription.getCompanyDescription())
        );

        try {
            System.out.println(
                    "Starting AI job description optimization..."
            );

            String rawResponse = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

            System.out.println(
                    "Raw Gemini optimization response:"
            );

            System.out.println(rawResponse);

            if (rawResponse == null ||
                    rawResponse.isBlank()) {

                throw new RuntimeException(
                        "Gemini returned an empty optimization response."
                );
            }

            String cleanedJson =
                    cleanJsonResponse(rawResponse);

            System.out.println(
                    "Cleaned optimization JSON:"
            );

            System.out.println(cleanedJson);

            JobOptimizationResponse result =
                    objectMapper.readValue(
                            cleanedJson,
                            JobOptimizationResponse.class
                    );

            if (result == null) {
                throw new RuntimeException(
                        "Could not create optimization response."
                );
            }

            System.out.println(
                    "Job description optimization completed successfully."
            );

            return result;

        } catch (Exception e) {

            System.err.println(
                    "Job description optimization failed."
            );

            System.err.println(
                    "Error: " + e.getMessage()
            );

            e.printStackTrace();

            throw new RuntimeException(
                    "Failed to optimize job description: "
                            + e.getMessage(),
                    e
            );
        }
    }

    private String cleanJsonResponse(
            String response) {

        String cleaned =
                response.trim();

        // Remove Markdown code fences if Gemini
        // returns them despite the prompt.

        if (cleaned.startsWith("```json")) {
            cleaned =
                    cleaned.substring(7).trim();
        } else if (cleaned.startsWith("```")) {
            cleaned =
                    cleaned.substring(3).trim();
        }

        if (cleaned.endsWith("```")) {
            cleaned =
                    cleaned.substring(
                            0,
                            cleaned.length() - 3
                    ).trim();
        }

        // Sometimes the model adds text before/after
        // the JSON. Extract the JSON object.

        int firstBrace =
                cleaned.indexOf("{");

        int lastBrace =
                cleaned.lastIndexOf("}");

        if (firstBrace >= 0 &&
                lastBrace > firstBrace) {

            cleaned =
                    cleaned.substring(
                            firstBrace,
                            lastBrace + 1
                    );
        }

        return cleaned;
    }

    private String safe(Object value) {

        if (value == null) {
            return "Not provided";
        }

        if (value instanceof Iterable<?> iterable) {

            StringBuilder result =
                    new StringBuilder();

            for (Object item : iterable) {

                if (result.length() > 0) {
                    result.append(", ");
                }

                result.append(item);
            }

            return result.toString();
        }

        return value.toString();
    }
}