package com.wevolve.jobdescription.service;

import com.wevolve.jobdescription.dto.JobDescriptionRequest;
import com.wevolve.jobdescription.dto.JobDescriptionResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiJobDescriptionService {

    private final ChatClient chatClient;

    public AiJobDescriptionService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public JobDescriptionResponse generateWithAI(JobDescriptionRequest request) {

        String prompt = """
                You are an expert recruitment and talent acquisition specialist.

                Generate a professional, ATS-friendly Job Description using ONLY
                the information provided by the user.

                STRICT RULES:

                1. Do not invent company facts, benefits, salary, locations,
                   technologies, certifications, policies, or other details
                   that were not provided.

                2. Do not assume benefits such as:
                   - health insurance
                   - bonuses
                   - paid leave
                   - salary
                   - stock options
                   - remote work
                   - career advancement
                   unless explicitly provided.

                3. Do not invent company-specific information.

                4. You may use reasonable professional wording to expand the
                   responsibilities and description of the role, but it must
                   remain consistent with the supplied information.

                5. Required skills must be based primarily on the skills provided
                   by the user.

                6. Preferred skills may include reasonable complementary skills,
                   but clearly keep them separate from required skills.

                7. If information required for a section is not provided,
                   return an empty string or an empty array rather than inventing
                   information.

                8. Avoid discriminatory or exclusionary language.

                9. Keep the job description professional, realistic and
                   ATS-friendly.

                10. Return ONLY the structured response. Do not include Markdown,
                    explanations or additional text.

                Generate the following fields:

                - jobTitle
                - aboutTheRole
                - responsibilities
                - requiredSkills
                - preferredSkills
                - experience
                - whatWeOffer
                - companyDescription

                USER INPUT:

                Job Title:
                %s

                Industry:
                %s

                Experience Level:
                %s

                Skills:
                %s

                Company Culture:
                %s

                Special Requirements:
                %s
                """.formatted(
                request.getJobTitle(),
                request.getIndustry(),
                request.getExperienceLevel(),
                request.getSkills() == null
                        ? "None provided"
                        : String.join(", ", request.getSkills()),
                request.getCompanyCulture(),
                request.getSpecialRequirements() == null
                        ? "None provided"
                        : request.getSpecialRequirements()
        );

        return chatClient.prompt()
                .user(prompt)
                .call()
                .entity(JobDescriptionResponse.class);
    }
}