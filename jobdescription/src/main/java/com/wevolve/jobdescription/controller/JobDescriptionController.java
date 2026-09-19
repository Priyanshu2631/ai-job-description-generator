package com.wevolve.jobdescription.controller;

import com.wevolve.jobdescription.dto.JobAnalysisResponse;
import com.wevolve.jobdescription.dto.JobDescriptionRequest;
import com.wevolve.jobdescription.dto.JobDescriptionResponse;
import com.wevolve.jobdescription.dto.JobOptimizationResponse;
import com.wevolve.jobdescription.model.JobDescription;
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

    @PostMapping("/generate")
    public JobDescriptionResponse generate(
            @Valid @RequestBody JobDescriptionRequest request) {

        return aiJobDescriptionService.generateWithAI(request);
    }

    @PostMapping("/save")
    public JobDescription save(
            @Valid @RequestBody JobDescriptionRequest request) {

        JobDescriptionResponse response =
                aiJobDescriptionService.generateWithAI(request);

        return jobDescriptionService.saveJobDescription(request, response);
    }

    @PostMapping("/save-edited")
    public JobDescription saveEdited(
            @RequestBody JobDescription jobDescription) {

        return jobDescriptionService.saveEditedJobDescription(jobDescription);
    }

    @GetMapping
    public List<JobDescription> getAllJobDescriptions() {
        return jobDescriptionService.getAllJobDescriptions();
    }

    @GetMapping("/{id}")
    public JobDescription getJobDescriptionById(
            @PathVariable Long id) {

        return jobDescriptionService.getJobDescriptionById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteJobDescription(
            @PathVariable Long id) {

        jobDescriptionService.deleteJobDescription(id);
    }

    @PostMapping("/{id}/analyze")
    public JobAnalysisResponse analyzeJobDescription(
            @PathVariable Long id) {

        JobDescription jobDescription =
                jobDescriptionService.getJobDescriptionById(id);

        return aiJobAnalysisService.analyzeJobDescription(jobDescription);
    }

    @PostMapping("/{id}/optimize")
    public JobOptimizationResponse optimizeJobDescription(
            @PathVariable Long id) {

        JobDescription jobDescription =
                jobDescriptionService.getJobDescriptionById(id);

        return aiJobOptimizationService.optimizeJobDescription(jobDescription);
    }
}