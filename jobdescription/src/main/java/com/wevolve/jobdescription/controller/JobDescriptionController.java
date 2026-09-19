package com.wevolve.jobdescription.controller;

import com.wevolve.jobdescription.dto.JobDescriptionRequest;
import com.wevolve.jobdescription.dto.JobDescriptionResponse;
import com.wevolve.jobdescription.model.JobDescription;
import com.wevolve.jobdescription.service.JobDescriptionService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-descriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class JobDescriptionController {

    private final JobDescriptionService jobDescriptionService;

    public JobDescriptionController(
            JobDescriptionService jobDescriptionService) {

        this.jobDescriptionService = jobDescriptionService;
    }

    // Generate a job description
    @PostMapping("/generate")
    public JobDescriptionResponse generate(
            @Valid @RequestBody JobDescriptionRequest request) {

        return jobDescriptionService.generateJobDescription(request);
    }

    // Save a generated job description
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

    // Save an edited job description
    @PostMapping("/save-edited")
    public JobDescription saveEdited(
            @RequestBody JobDescription jobDescription) {

        return jobDescriptionService.saveEditedJobDescription(
                jobDescription
        );
    }

    // Get all saved job descriptions
    @GetMapping
    public List<JobDescription> getAllJobDescriptions() {

        return jobDescriptionService.getAllJobDescriptions();
    }

    // Get a job description by ID
    @GetMapping("/{id}")
    public JobDescription getJobDescriptionById(
            @PathVariable Long id) {

        return jobDescriptionService.getJobDescriptionById(id);
    }
}