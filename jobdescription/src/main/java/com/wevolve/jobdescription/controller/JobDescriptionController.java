package com.wevolve.jobdescription.controller;

import com.wevolve.jobdescription.dto.JobDescriptionRequest;
import com.wevolve.jobdescription.dto.JobDescriptionResponse;
import com.wevolve.jobdescription.model.JobDescription;
import com.wevolve.jobdescription.service.AiJobDescriptionService;
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

    public JobDescriptionController(
            JobDescriptionService jobDescriptionService,
            AiJobDescriptionService aiJobDescriptionService) {

        this.jobDescriptionService = jobDescriptionService;
        this.aiJobDescriptionService = aiJobDescriptionService;
    }

    @PostMapping("/generate")
    public JobDescriptionResponse generate(
            @Valid @RequestBody JobDescriptionRequest request) {

        return jobDescriptionService.generateJobDescription(request);
    }

    @PostMapping("/generate-ai")
    public JobDescriptionResponse generateWithAI(
            @Valid @RequestBody JobDescriptionRequest request) {

        return aiJobDescriptionService.generateWithAI(request);
    }

    @PostMapping("/save")
    public JobDescription save(
            @Valid @RequestBody JobDescriptionRequest request) {

        JobDescriptionResponse response =
                jobDescriptionService.generateJobDescription(request);

        return jobDescriptionService.saveJobDescription(request, response);
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

    @PostMapping("/save-edited")
    public JobDescription saveEdited(
            @RequestBody JobDescription jobDescription) {

        return jobDescriptionService.saveEditedJobDescription(jobDescription);
    }
}