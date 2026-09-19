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

    public JobDescriptionResponse() {
    }

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

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getAboutTheRole() {
        return aboutTheRole;
    }

    public void setAboutTheRole(String aboutTheRole) {
        this.aboutTheRole = aboutTheRole;
    }

    public List<String> getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(List<String> responsibilities) {
        this.responsibilities = responsibilities;
    }

    public List<String> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(List<String> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public List<String> getPreferredSkills() {
        return preferredSkills;
    }

    public void setPreferredSkills(List<String> preferredSkills) {
        this.preferredSkills = preferredSkills;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public List<String> getWhatWeOffer() {
        return whatWeOffer;
    }

    public void setWhatWeOffer(List<String> whatWeOffer) {
        this.whatWeOffer = whatWeOffer;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }
}