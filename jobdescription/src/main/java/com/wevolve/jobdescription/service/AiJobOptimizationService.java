package com.wevolve.jobdescription.service;

import com.wevolve.jobdescription.dto.JobOptimizationResponse;
import com.wevolve.jobdescription.model.JobDescription;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiJobOptimizationService {

    private final ChatClient chatClient;

    public AiJobOptimizationService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
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
                9. Return the complete optimized version, not only the changed
                   sections.
                10. List the important improvements in changesMade.
                11. Return ONLY the structured response.
                12. Do not return Markdown or explanations outside the response.

                The response must contain exactly these fields:

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

        return chatClient.prompt()
                .user(prompt)
                .call()
                .entity(JobOptimizationResponse.class);
    }

    private String safe(Object value) {
        if (value == null) {
            return "Not provided";
        }

        if (value instanceof Iterable<?> iterable) {
            StringBuilder result = new StringBuilder();

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