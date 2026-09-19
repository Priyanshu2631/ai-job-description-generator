package com.wevolve.jobdescription.service;

import com.wevolve.jobdescription.dto.JobDescriptionRequest;
import com.wevolve.jobdescription.dto.JobDescriptionResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiJobDescriptionService {

    private final ChatClient chatClient;

    public AiJobDescriptionService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public JobDescriptionResponse generateWithAI(JobDescriptionRequest request) {

        String prompt = """
                You are an expert recruitment and talent acquisition specialist.

                Generate a professional, ATS-friendly Job Description using the
                information provided below.

                IMPORTANT:
                - Return ONLY valid JSON.
                - Do not use Markdown.
                - Do not add explanations outside the JSON.
                - Keep the response professional and realistic.
                - Avoid discriminatory or exclusionary language.
                - Make responsibilities specific to the role and industry.
                - Separate required skills from preferred skills.
                - Do not invent unrealistic requirements.

                The JSON must have exactly these fields:

                {
                  "jobTitle": "string",
                  "aboutTheRole": "string",
                  "responsibilities": ["string"],
                  "requiredSkills": ["string"],
                  "preferredSkills": ["string"],
                  "experience": "string",
                  "whatWeOffer": ["string"],
                  "companyDescription": "string"
                }

                Candidate input:

                Job Title: %s
                Industry: %s
                Experience Level: %s
                Skills: %s
                Company Culture: %s
                Special Requirements: %s
                """.formatted(
                request.getJobTitle(),
                request.getIndustry(),
                request.getExperienceLevel(),
                String.join(", ", request.getSkills()),
                request.getCompanyCulture(),
                request.getSpecialRequirements() == null
                        ? "None"
                        : request.getSpecialRequirements()
        );

        return chatClient.prompt()
                .user(prompt)
                .call()
                .entity(JobDescriptionResponse.class);
    }
}