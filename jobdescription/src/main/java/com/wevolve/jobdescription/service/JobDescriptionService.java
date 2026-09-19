package com.wevolve.jobdescription.service;

import com.wevolve.jobdescription.dto.JobDescriptionRequest;
import com.wevolve.jobdescription.dto.JobDescriptionResponse;
import com.wevolve.jobdescription.model.JobDescription;
import com.wevolve.jobdescription.repository.JobDescriptionRepository;
import org.springframework.stereotype.Service;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobDescriptionService {

    private final JobDescriptionRepository jobDescriptionRepository;
    private final ObjectMapper objectMapper;

    public JobDescriptionService(
            JobDescriptionRepository jobDescriptionRepository,
            ObjectMapper objectMapper) {

        this.jobDescriptionRepository = jobDescriptionRepository;
        this.objectMapper = objectMapper;
    }

    // --------------------------------------------------
    // GENERATE JOB DESCRIPTION
    // --------------------------------------------------

    public JobDescriptionResponse generateJobDescription(
            JobDescriptionRequest request) {

        String jobTitle = request.getJobTitle();
        String industry = request.getIndustry();
        String experienceLevel = request.getExperienceLevel();
        List<String> skills = request.getSkills();

        String aboutTheRole = generateAboutRole(
                jobTitle,
                industry,
                experienceLevel
        );

        List<String> responsibilities = generateResponsibilities(
                jobTitle,
                industry,
                skills
        );

        List<String> requiredSkills = new ArrayList<>(skills);

        List<String> preferredSkills = generatePreferredSkills(
                skills,
                industry
        );

        String experience = generateExperience(
                experienceLevel
        );

        List<String> benefits = generateBenefits(
                request.getCompanyCulture()
        );

        String companyDescription = generateCompanyDescription(
                industry,
                request.getCompanyCulture()
        );

        return new JobDescriptionResponse(
                jobTitle,
                aboutTheRole,
                responsibilities,
                requiredSkills,
                preferredSkills,
                experience,
                benefits,
                companyDescription
        );
    }

    // --------------------------------------------------
    // ABOUT ROLE
    // --------------------------------------------------

    private String generateAboutRole(
            String jobTitle,
            String industry,
            String experienceLevel) {

        String levelText;

        switch (experienceLevel.toLowerCase()) {

            case "entry":
                levelText = "Entry-level";
                break;

            case "mid":
                levelText = "Mid-level";
                break;

            case "senior":
                levelText = "Senior";
                break;

            default:
                levelText = experienceLevel;
        }

        String industryFocus = getIndustryFocus(industry);

        return "We are looking for a "
                + levelText
                + " "
                + jobTitle
                + " to join our "
                + industry
                + " team. "
                + "In this role, you will work on "
                + industryFocus
                + ", collaborate with cross-functional teams, "
                + "and contribute to meaningful business outcomes.";
    }

    // --------------------------------------------------
    // RESPONSIBILITIES
    // --------------------------------------------------

    private List<String> generateResponsibilities(
            String jobTitle,
            String industry,
            List<String> skills) {

        List<String> responsibilities = new ArrayList<>();

        responsibilities.add(
                "Design, develop and maintain high-quality "
                        + jobTitle
                        + " solutions."
        );

        responsibilities.add(
                "Collaborate with product, engineering and "
                        + "business teams to understand requirements "
                        + "and deliver effective solutions."
        );

        responsibilities.add(
                "Build and improve applications using "
                        + String.join(", ", skills)
                        + "."
        );

        responsibilities.add(
                getIndustryResponsibility(industry)
        );

        responsibilities.add(
                "Write clean, maintainable and well-documented code."
        );

        responsibilities.add(
                "Participate in testing, debugging and code reviews."
        );

        responsibilities.add(
                "Continuously learn and adopt relevant technologies "
                        + "and development practices."
        );

        return responsibilities;
    }

    // --------------------------------------------------
    // INDUSTRY RESPONSIBILITY
    // --------------------------------------------------

    private String getIndustryResponsibility(
            String industry) {

        String value = industry.toLowerCase();

        if (value.contains("fintech")
                || value.contains("finance")
                || value.contains("bank")) {

            return "Develop reliable solutions with a strong focus "
                    + "on data security, transaction integrity and "
                    + "financial technology requirements.";
        }

        if (value.contains("health")
                || value.contains("medical")) {

            return "Develop reliable solutions while considering "
                    + "data privacy, security and healthcare-specific "
                    + "requirements.";
        }

        if (value.contains("ecommerce")
                || value.contains("retail")) {

            return "Build scalable customer-facing solutions "
                    + "that support reliable digital commerce "
                    + "experiences.";
        }

        if (value.contains("software")
                || value.contains("technology")
                || value.contains("saas")) {

            return "Build scalable and maintainable software "
                    + "solutions aligned with product and technology goals.";
        }

        if (value.contains("education")
                || value.contains("edtech")) {

            return "Build accessible technology solutions that "
                    + "support effective learning and user engagement.";
        }

        return "Develop solutions aligned with industry requirements, "
                + "business objectives and user needs.";
    }

    // --------------------------------------------------
    // INDUSTRY FOCUS
    // --------------------------------------------------

    private String getIndustryFocus(
            String industry) {

        String value = industry.toLowerCase();

        if (value.contains("fintech")
                || value.contains("finance")
                || value.contains("bank")) {

            return "building secure and scalable financial technology solutions";
        }

        if (value.contains("health")
                || value.contains("medical")) {

            return "building reliable technology solutions for healthcare workflows";
        }

        if (value.contains("ecommerce")
                || value.contains("retail")) {

            return "building scalable digital commerce experiences";
        }

        if (value.contains("education")
                || value.contains("edtech")) {

            return "building technology solutions that improve learning experiences";
        }

        if (value.contains("software")
                || value.contains("technology")
                || value.contains("saas")) {

            return "building scalable software products and technology solutions";
        }

        return "building high-quality solutions for the industry";
    }

    // --------------------------------------------------
    // PREFERRED SKILLS
    // --------------------------------------------------

    private List<String> generatePreferredSkills(
            List<String> skills,
            String industry) {

        List<String> preferredSkills = new ArrayList<>();

        for (String skill : skills) {

            if (skill.equalsIgnoreCase("Java")) {
                preferredSkills.add("Spring Boot");
            }

            if (skill.equalsIgnoreCase("React")) {
                preferredSkills.add("JavaScript");
            }

            if (skill.equalsIgnoreCase("Python")) {
                preferredSkills.add("SQL");
            }

            if (skill.equalsIgnoreCase("Spring Boot")) {
                preferredSkills.add("REST APIs");
            }

            if (skill.equalsIgnoreCase("JavaScript")) {
                preferredSkills.add("TypeScript");
            }

            if (skill.equalsIgnoreCase("Machine Learning")
                    || skill.equalsIgnoreCase("ML")) {

                preferredSkills.add("Python");
                preferredSkills.add("Data Analysis");
            }
        }

        String industryValue = industry.toLowerCase();

        if (industryValue.contains("fintech")
                || industryValue.contains("finance")) {

            preferredSkills.add("Data Security");
        }

        return removeDuplicates(preferredSkills);
    }

    // --------------------------------------------------
    // EXPERIENCE
    // --------------------------------------------------

    private String generateExperience(
            String experienceLevel) {

        switch (experienceLevel.toLowerCase()) {

            case "entry":
                return "0-2 years of relevant experience.";

            case "mid":
                return "2-5 years of relevant experience.";

            case "senior":
                return "5+ years of relevant experience.";

            default:
                return "Relevant experience in the field.";
        }
    }

    // --------------------------------------------------
    // BENEFITS
    // --------------------------------------------------

    private List<String> generateBenefits(
            String companyCulture) {

        List<String> benefits = new ArrayList<>();

        benefits.add("Competitive compensation");

        benefits.add(
                "Opportunities for professional growth"
        );

        benefits.add(
                "Collaborative and supportive work environment"
        );

        if (companyCulture.equalsIgnoreCase("Remote-first")) {

            benefits.add(
                    "Flexible remote working opportunities"
            );

        } else if (companyCulture.equalsIgnoreCase("Startup")) {

            benefits.add(
                    "Opportunity to work on impactful products"
            );

            benefits.add(
                    "Fast-paced learning environment"
            );

        } else {

            benefits.add(
                    "Structured career development opportunities"
            );
        }

        return benefits;
    }

    // --------------------------------------------------
    // COMPANY DESCRIPTION
    // --------------------------------------------------

    private String generateCompanyDescription(
            String industry,
            String companyCulture) {

        return "We are a "
                + companyCulture
                + " organization operating in the "
                + industry
                + " industry, focused on building innovative "
                + "solutions and creating meaningful impact.";
    }

    // --------------------------------------------------
    // SAVE NEW
    // --------------------------------------------------

    public JobDescription saveJobDescription(
            JobDescriptionRequest request,
            JobDescriptionResponse response) {

        JobDescription jobDescription = new JobDescription();

        jobDescription.setJobTitle(
                request.getJobTitle()
        );

        jobDescription.setIndustry(
                request.getIndustry()
        );

        jobDescription.setExperienceLevel(
                request.getExperienceLevel()
        );

        jobDescription.setAboutTheRole(
                response.getAboutTheRole()
        );

        try {

            jobDescription.setResponsibilities(
                    objectMapper.writeValueAsString(
                            response.getResponsibilities()
                    )
            );

            jobDescription.setRequiredSkills(
                    objectMapper.writeValueAsString(
                            response.getRequiredSkills()
                    )
            );

            jobDescription.setPreferredSkills(
                    objectMapper.writeValueAsString(
                            response.getPreferredSkills()
                    )
            );

            jobDescription.setWhatWeOffer(
                    objectMapper.writeValueAsString(
                            response.getWhatWeOffer()
                    )
            );

        } catch (JacksonException e) {

            throw new RuntimeException(
                    "Error converting job description data",
                    e
            );
        }

        jobDescription.setExperience(
                response.getExperience()
        );

        jobDescription.setCompanyDescription(
                response.getCompanyDescription()
        );

        jobDescription.setCompanyCulture(
                request.getCompanyCulture()
        );

        jobDescription.setSpecialRequirements(
                request.getSpecialRequirements()
        );

        return jobDescriptionRepository.save(
                jobDescription
        );
    }

    // --------------------------------------------------
    // SAVE / UPDATE EDITED
    // --------------------------------------------------

    public JobDescription saveEditedJobDescription(
            JobDescription jobDescription) {

        return jobDescriptionRepository.save(
                jobDescription
        );
    }

    // --------------------------------------------------
    // GET ALL
    // --------------------------------------------------

    public List<JobDescription> getAllJobDescriptions() {

        return jobDescriptionRepository.findAll();
    }

    // --------------------------------------------------
    // GET BY ID
    // --------------------------------------------------

    public JobDescription getJobDescriptionById(
            Long id) {

        return jobDescriptionRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Job description not found with id: "
                                        + id
                        )
                );
    }

    // --------------------------------------------------
    // DELETE
    // --------------------------------------------------

    public void deleteJobDescription(Long id) {

        if (!jobDescriptionRepository.existsById(id)) {

            throw new RuntimeException(
                    "Job description not found with id: "
                            + id
            );
        }

        jobDescriptionRepository.deleteById(id);
    }

    // --------------------------------------------------
    // REMOVE DUPLICATES
    // --------------------------------------------------

    private List<String> removeDuplicates(
            List<String> values) {

        List<String> result = new ArrayList<>();

        for (String value : values) {

            boolean exists = false;

            for (String existing : result) {

                if (existing.equalsIgnoreCase(value)) {

                    exists = true;
                    break;
                }
            }

            if (!exists) {
                result.add(value);
            }
        }

        return result;
    }
}