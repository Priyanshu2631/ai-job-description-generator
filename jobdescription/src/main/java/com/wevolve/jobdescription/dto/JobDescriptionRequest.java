package com.wevolve.jobdescription.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class JobDescriptionRequest {

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Industry is required")
    private String industry;

    @NotBlank(message = "Experience level is required")
    private String experienceLevel;

    @NotEmpty(message = "At least one skill is required")
    private List<String> skills;

    @NotBlank(message = "Company culture is required")
    private String companyCulture;

    private String specialRequirements;


    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }


    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }


    public String getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }


    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }


    public String getCompanyCulture() {
        return companyCulture;
    }

    public void setCompanyCulture(String companyCulture) {
        this.companyCulture = companyCulture;
    }


    public String getSpecialRequirements() {
        return specialRequirements;
    }

    public void setSpecialRequirements(
            String specialRequirements) {

        this.specialRequirements =
                specialRequirements;
    }
}