package com.wevolve.jobdescription.controller;

import com.wevolve.jobdescription.dto.JobAnalysisResponse;
import com.wevolve.jobdescription.dto.JobDescriptionRequest;
import com.wevolve.jobdescription.dto.JobDescriptionResponse;
import com.wevolve.jobdescription.dto.JobOptimizationResponse;
import com.wevolve.jobdescription.model.JobDescription;
import com.wevolve.jobdescription.model.JobDescriptionVersion;
import com.wevolve.jobdescription.service.AiJobAnalysisService;
import com.wevolve.jobdescription.service.AiJobDescriptionService;
import com.wevolve.jobdescription.service.AiJobOptimizationService;
import com.wevolve.jobdescription.service.JobDescriptionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-descriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class JobDescriptionController {

    private final JobDescriptionService jobDescriptionService;
    private final AiJobDescriptionService aiJobDescriptionService;
    private final AiJobAnalysisService aiJobAnalysisService;
    private final AiJobOptimizationService aiJobOptimizationService;

    public JobDescriptionController(
            JobDescriptionService jobDescriptionService,
            AiJobDescriptionService aiJobDescriptionService,
            AiJobAnalysisService aiJobAnalysisService,
            AiJobOptimizationService aiJobOptimizationService) {

        this.jobDescriptionService = jobDescriptionService;
        this.aiJobDescriptionService = aiJobDescriptionService;
        this.aiJobAnalysisService = aiJobAnalysisService;
        this.aiJobOptimizationService = aiJobOptimizationService;
    }

    // --------------------------------------------------
    // GENERATE
    // --------------------------------------------------

    @PostMapping("/generate")
    public JobDescriptionResponse generate(
            @Valid @RequestBody JobDescriptionRequest request) {

        return jobDescriptionService.generateJobDescription(request);
    }

    // --------------------------------------------------
    // GENERATE WITH AI
    // --------------------------------------------------

    @PostMapping("/generate-ai")
    public JobDescriptionResponse generateWithAI(
            @Valid @RequestBody JobDescriptionRequest request) {

        return aiJobDescriptionService.generateWithAI(request);
    }

    // --------------------------------------------------
    // SAVE NEW
    // --------------------------------------------------

    @PostMapping("/save")
    public JobDescription save(
            @Valid @RequestBody JobDescriptionRequest request) {

        JobDescriptionResponse response =
                jobDescriptionService.generateJobDescription(request);

        return jobDescriptionService.saveJobDescription(
                request,
                response
        );
    }

    // --------------------------------------------------
    // GET ALL JOB DESCRIPTIONS
    // --------------------------------------------------

    @GetMapping
    public List<JobDescription> getAllJobDescriptions() {

        return jobDescriptionService.getAllJobDescriptions();
    }

    // --------------------------------------------------
    // GET JOB DESCRIPTION BY ID
    // --------------------------------------------------

    @GetMapping("/{id}")
    public JobDescription getJobDescriptionById(
            @PathVariable Long id) {

        return jobDescriptionService.getJobDescriptionById(id);
    }

    // --------------------------------------------------
    // UPDATE JOB DESCRIPTION
    // --------------------------------------------------

    @PutMapping("/{id}")
    public JobDescription updateJobDescription(
            @PathVariable Long id,
            @RequestBody JobDescription jobDescription) {

        JobDescription existing =
                jobDescriptionService.getJobDescriptionById(id);

        if (jobDescription.getId() != null
                && !id.equals(jobDescription.getId())) {

            throw new IllegalArgumentException(
                    "Job description ID in request does not match URL."
            );
        }

        return jobDescriptionService.saveEditedJobDescription(
                copyWithId(jobDescription, existing)
        );
    }

    // --------------------------------------------------
    // SAVE / UPDATE EDITED
    // --------------------------------------------------

    @PostMapping("/save-edited")
    public JobDescription saveEdited(
            @RequestBody JobDescription jobDescription) {

        return jobDescriptionService.saveEditedJobDescription(
                jobDescription
        );
    }

    // --------------------------------------------------
    // AI ANALYSIS
    // --------------------------------------------------

    @PostMapping("/{id}/analyze")
    public JobAnalysisResponse analyzeJobDescription(
            @PathVariable Long id) {

        JobDescription jobDescription =
                jobDescriptionService.getJobDescriptionById(id);

        return aiJobAnalysisService.analyzeJobDescription(
                jobDescription
        );
    }

    // --------------------------------------------------
    // AI OPTIMIZATION
    // --------------------------------------------------

    @PostMapping("/{id}/optimize")
    public JobOptimizationResponse optimizeJobDescription(
            @PathVariable Long id) {

        JobDescription jobDescription =
                jobDescriptionService.getJobDescriptionById(id);

        return aiJobOptimizationService.optimizeJobDescription(
                jobDescription
        );
    }

    // --------------------------------------------------
    // DUPLICATE
    // --------------------------------------------------

    @PostMapping("/{id}/duplicate")
    public JobDescription duplicate(
            @PathVariable Long id) {

        return jobDescriptionService.duplicateJobDescription(id);
    }

    // --------------------------------------------------
    // VERSION HISTORY
    // --------------------------------------------------

    @GetMapping("/{id}/versions")
    public List<JobDescriptionVersion> getVersions(
            @PathVariable Long id) {

        return jobDescriptionService.getVersions(id);
    }

    // --------------------------------------------------
    // GET SINGLE VERSION
    // --------------------------------------------------

    @GetMapping("/{id}/versions/{versionId}")
    public JobDescriptionVersion getVersion(
            @PathVariable Long id,
            @PathVariable Long versionId) {

        return jobDescriptionService.getVersion(
                id,
                versionId
        );
    }

    // --------------------------------------------------
    // RESTORE VERSION
    // --------------------------------------------------

    @PostMapping("/{id}/versions/{versionId}/restore")
    public JobDescription restoreVersion(
            @PathVariable Long id,
            @PathVariable Long versionId) {

        return jobDescriptionService.restoreVersion(
                id,
                versionId
        );
    }

    // --------------------------------------------------
    // DELETE
    // --------------------------------------------------

    @DeleteMapping("/{id}")
    public void deleteJobDescription(
            @PathVariable Long id) {

        jobDescriptionService.deleteJobDescription(id);
    }

    // --------------------------------------------------
    // INTERNAL HELPER
    // --------------------------------------------------

    private JobDescription copyWithId(
            JobDescription source,
            JobDescription existing) {

        existing.setJobTitle(source.getJobTitle());
        existing.setIndustry(source.getIndustry());
        existing.setExperienceLevel(source.getExperienceLevel());
        existing.setAboutTheRole(source.getAboutTheRole());
        existing.setResponsibilities(source.getResponsibilities());
        existing.setRequiredSkills(source.getRequiredSkills());
        existing.setPreferredSkills(source.getPreferredSkills());
        existing.setExperience(source.getExperience());
        existing.setWhatWeOffer(source.getWhatWeOffer());
        existing.setCompanyDescription(source.getCompanyDescription());
        existing.setCompanyCulture(source.getCompanyCulture());
        existing.setSpecialRequirements(source.getSpecialRequirements());

        return existing;
    }
}