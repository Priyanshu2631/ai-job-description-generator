package com.wevolve.jobdescription.dto;

import java.util.List;

public class JobDescriptionResponse {

    private String jobTitle;
    private String aboutTheRole;
    private List<String> responsibilities;
    private List<String> requiredSkills;
    private List<String> preferredSkills;
    private String experience;
    private List<String> whatWeOffer;
    private String companyDescription;

    public JobDescriptionResponse(
            String jobTitle,
            String aboutTheRole,
            List<String> responsibilities,
            List<String> requiredSkills,
            List<String> preferredSkills,
            String experience,
            List<String> whatWeOffer,
            String companyDescription) {

        this.jobTitle = jobTitle;
        this.aboutTheRole = aboutTheRole;
        this.responsibilities = responsibilities;
        this.requiredSkills = requiredSkills;
        this.preferredSkills = preferredSkills;
        this.experience = experience;
        this.whatWeOffer = whatWeOffer;
        this.companyDescription = companyDescription;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getAboutTheRole() {
        return aboutTheRole;
    }

    public List<String> getResponsibilities() {
        return responsibilities;
    }

    public List<String> getRequiredSkills() {
        return requiredSkills;
    }

    public List<String> getPreferredSkills() {
        return preferredSkills;
    }

    public String getExperience() {
        return experience;
    }

    public List<String> getWhatWeOffer() {
        return whatWeOffer;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }
}