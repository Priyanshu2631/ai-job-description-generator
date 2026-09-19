package com.wevolve.jobdescription.model;

import jakarta.persistence.*;

@Entity
@Table(name = "job_descriptions")
public class JobDescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobTitle;

    private String industry;

    private String experienceLevel;

    @Column(length = 5000)
    private String aboutTheRole;

    @Column(length = 10000)
    private String responsibilities;

    @Column(length = 5000)
    private String requiredSkills;

    @Column(length = 5000)
    private String preferredSkills;

    private String experience;

    @Column(length = 5000)
    private String whatWeOffer;

    @Column(length = 5000)
    private String companyDescription;

    private String companyCulture;

    @Column(length = 2000)
    private String specialRequirements;

    // Getters and Setters

    public Long getId() {
        return id;
    }

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

    public String getAboutTheRole() {
        return aboutTheRole;
    }

    public void setAboutTheRole(String aboutTheRole) {
        this.aboutTheRole = aboutTheRole;
    }

    public String getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(String responsibilities) {
        this.responsibilities = responsibilities;
    }

    public String getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(String requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public String getPreferredSkills() {
        return preferredSkills;
    }

    public void setPreferredSkills(String preferredSkills) {
        this.preferredSkills = preferredSkills;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getWhatWeOffer() {
        return whatWeOffer;
    }

    public void setWhatWeOffer(String whatWeOffer) {
        this.whatWeOffer = whatWeOffer;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
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

    public void setSpecialRequirements(String specialRequirements) {
        this.specialRequirements = specialRequirements;
    }
}