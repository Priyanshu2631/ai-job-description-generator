package com.wevolve.jobdescription.dto;

import java.util.List;

public class JobAnalysisResponse {

    private int atsScore;
    private int skillCoverageScore;
    private int clarityScore;

    private List<String> missingInformation;
    private List<String> keywordSuggestions;
    private List<String> improvementSuggestions;
    private List<String> potentialIssues;

    public JobAnalysisResponse() {
    }

    public JobAnalysisResponse(
            int atsScore,
            int skillCoverageScore,
            int clarityScore,
            List<String> missingInformation,
            List<String> keywordSuggestions,
            List<String> improvementSuggestions,
            List<String> potentialIssues) {

        this.atsScore = atsScore;
        this.skillCoverageScore = skillCoverageScore;
        this.clarityScore = clarityScore;
        this.missingInformation = missingInformation;
        this.keywordSuggestions = keywordSuggestions;
        this.improvementSuggestions = improvementSuggestions;
        this.potentialIssues = potentialIssues;
    }

    public int getAtsScore() {
        return atsScore;
    }

    public void setAtsScore(int atsScore) {
        this.atsScore = atsScore;
    }

    public int getSkillCoverageScore() {
        return skillCoverageScore;
    }

    public void setSkillCoverageScore(int skillCoverageScore) {
        this.skillCoverageScore = skillCoverageScore;
    }

    public int getClarityScore() {
        return clarityScore;
    }

    public void setClarityScore(int clarityScore) {
        this.clarityScore = clarityScore;
    }

    public List<String> getMissingInformation() {
        return missingInformation;
    }

    public void setMissingInformation(List<String> missingInformation) {
        this.missingInformation = missingInformation;
    }

    public List<String> getKeywordSuggestions() {
        return keywordSuggestions;
    }

    public void setKeywordSuggestions(List<String> keywordSuggestions) {
        this.keywordSuggestions = keywordSuggestions;
    }

    public List<String> getImprovementSuggestions() {
        return improvementSuggestions;
    }

    public void setImprovementSuggestions(List<String> improvementSuggestions) {
        this.improvementSuggestions = improvementSuggestions;
    }

    public List<String> getPotentialIssues() {
        return potentialIssues;
    }

    public void setPotentialIssues(List<String> potentialIssues) {
        this.potentialIssues = potentialIssues;
    }
}