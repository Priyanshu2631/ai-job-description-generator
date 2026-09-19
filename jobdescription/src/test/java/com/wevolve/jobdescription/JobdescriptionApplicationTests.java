package com.wevolve.jobdescription;

import com.wevolve.jobdescription.dto.JobDescriptionRequest;
import com.wevolve.jobdescription.dto.JobDescriptionResponse;
import com.wevolve.jobdescription.service.JobDescriptionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JobdescriptionApplicationTests {

    @Autowired
    private JobDescriptionService jobDescriptionService;


    @Test
    void applicationContextLoads() {
        assertNotNull(jobDescriptionService);
    }


    @Test
    void generateJobDescriptionReturnsStructuredContent() {

        JobDescriptionRequest request =
                new JobDescriptionRequest();

        request.setJobTitle(
                "Software Engineer"
        );

        request.setIndustry(
                "FinTech"
        );

        request.setExperienceLevel(
                "Entry"
        );

        request.setSkills(
                List.of(
                        "Java",
                        "Spring Boot",
                        "React"
                )
        );

        request.setCompanyCulture(
                "Startup"
        );

        request.setSpecialRequirements(
                "Good communication skills"
        );


        JobDescriptionResponse response =
                jobDescriptionService
                        .generateJobDescription(
                                request
                        );


        assertNotNull(response);

        assertEquals(
                "Software Engineer",
                response.getJobTitle()
        );

        assertNotNull(
                response.getAboutTheRole()
        );

        assertFalse(
                response.getAboutTheRole()
                        .isBlank()
        );

        assertNotNull(
                response.getResponsibilities()
        );

        assertFalse(
                response.getResponsibilities()
                        .isEmpty()
        );

        assertNotNull(
                response.getRequiredSkills()
        );

        assertEquals(
                3,
                response.getRequiredSkills()
                        .size()
        );

        assertNotNull(
                response.getWhatWeOffer()
        );

        assertFalse(
                response.getWhatWeOffer()
                        .isEmpty()
        );
    }


    @Test
    void fintechGenerationContainsIndustrySpecificContent() {

        JobDescriptionRequest request =
                new JobDescriptionRequest();

        request.setJobTitle(
                "Backend Developer"
        );

        request.setIndustry(
                "FinTech"
        );

        request.setExperienceLevel(
                "Mid"
        );

        request.setSkills(
                List.of(
                        "Java",
                        "Spring Boot"
                )
        );

        request.setCompanyCulture(
                "Corporate"
        );


        JobDescriptionResponse response =
                jobDescriptionService
                        .generateJobDescription(
                                request
                        );


        String combinedText =
                String.join(
                        " ",
                        response.getResponsibilities()
                ).toLowerCase();


        assertTrue(
                combinedText.contains(
                        "security"
                )
                        || combinedText.contains(
                        "transaction"
                )
        );
    }
}