package com.wevolve.jobdescription.dto;

import java.util.List;

public class JobOptimizationResponse {

    private String optimizedAboutTheRole;
    private List<String> optimizedResponsibilities;
    private List<String> optimizedRequiredSkills;
    private List<String> optimizedPreferredSkills;
    private String optimizedExperience;
    private List<String> optimizedWhatWeOffer;
    private String optimizedCompanyDescription;

    private List<String> changesMade;

    public JobOptimizationResponse() {
    }

    public String getOptimizedAboutTheRole() {
        return optimizedAboutTheRole;
    }

    public void setOptimizedAboutTheRole(String optimizedAboutTheRole) {
        this.optimizedAboutTheRole = optimizedAboutTheRole;
    }

    public List<String> getOptimizedResponsibilities() {
        return optimizedResponsibilities;
    }

    public void setOptimizedResponsibilities(List<String> optimizedResponsibilities) {
        this.optimizedResponsibilities = optimizedResponsibilities;
    }

    public List<String> getOptimizedRequiredSkills() {
        return optimizedRequiredSkills;
    }

    public void setOptimizedRequiredSkills(List<String> optimizedRequiredSkills) {
        this.optimizedRequiredSkills = optimizedRequiredSkills;
    }

    public List<String> getOptimizedPreferredSkills() {
        return optimizedPreferredSkills;
    }

    public void setOptimizedPreferredSkills(List<String> optimizedPreferredSkills) {
        this.optimizedPreferredSkills = optimizedPreferredSkills;
    }

    public String getOptimizedExperience() {
        return optimizedExperience;
    }

    public void setOptimizedExperience(String optimizedExperience) {
        this.optimizedExperience = optimizedExperience;
    }

    public List<String> getOptimizedWhatWeOffer() {
        return optimizedWhatWeOffer;
    }

    public void setOptimizedWhatWeOffer(List<String> optimizedWhatWeOffer) {
        this.optimizedWhatWeOffer = optimizedWhatWeOffer;
    }

    public String getOptimizedCompanyDescription() {
        return optimizedCompanyDescription;
    }

    public void setOptimizedCompanyDescription(String optimizedCompanyDescription) {
        this.optimizedCompanyDescription = optimizedCompanyDescription;
    }

    public List<String> getChangesMade() {
        return changesMade;
    }

    public void setChangesMade(List<String> changesMade) {
        this.changesMade = changesMade;
    }
}