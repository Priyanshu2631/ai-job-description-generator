package com.wevolve.jobdescription.controller;

import com.wevolve.jobdescription.dto.JobDescriptionRequest;
import com.wevolve.jobdescription.dto.JobDescriptionResponse;
import com.wevolve.jobdescription.model.JobDescription;
import com.wevolve.jobdescription.model.JobDescriptionVersion;
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

    private final AiJobDescriptionService
            aiJobDescriptionService;


    public JobDescriptionController(
            JobDescriptionService jobDescriptionService,
            AiJobDescriptionService aiJobDescriptionService) {

        this.jobDescriptionService =
                jobDescriptionService;

        this.aiJobDescriptionService =
                aiJobDescriptionService;
    }


    // --------------------------------------------------
    // GENERATE
    // --------------------------------------------------

    @PostMapping("/generate")
    public JobDescriptionResponse generate(
            @Valid @RequestBody JobDescriptionRequest request) {

        return jobDescriptionService
                .generateJobDescription(request);
    }


    // --------------------------------------------------
    // GENERATE WITH AI
    // --------------------------------------------------

    @PostMapping("/generate-ai")
    public JobDescriptionResponse generateWithAI(
            @Valid @RequestBody JobDescriptionRequest request) {

        return aiJobDescriptionService
                .generateWithAI(request);
    }


    // --------------------------------------------------
    // SAVE NEW
    // --------------------------------------------------

    @PostMapping("/save")
    public JobDescription save(
            @Valid @RequestBody JobDescriptionRequest request) {

        JobDescriptionResponse response =
                jobDescriptionService
                        .generateJobDescription(
                                request
                        );

        return jobDescriptionService
                .saveJobDescription(
                        request,
                        response
                );
    }


    // --------------------------------------------------
    // GET ALL JOB DESCRIPTIONS
    // --------------------------------------------------

    @GetMapping
    public List<JobDescription>
    getAllJobDescriptions() {

        return jobDescriptionService
                .getAllJobDescriptions();
    }


    // --------------------------------------------------
    // GET JOB DESCRIPTION BY ID
    // --------------------------------------------------

    @GetMapping("/{id}")
    public JobDescription
    getJobDescriptionById(
            @PathVariable Long id) {

        return jobDescriptionService
                .getJobDescriptionById(id);
    }


    // --------------------------------------------------
    // SAVE / UPDATE EDITED
    // --------------------------------------------------

    @PostMapping("/save-edited")
    public JobDescription saveEdited(
            @RequestBody JobDescription jobDescription) {

        return jobDescriptionService
                .saveEditedJobDescription(
                        jobDescription
                );
    }


    // --------------------------------------------------
    // DUPLICATE
    // --------------------------------------------------

    @PostMapping("/{id}/duplicate")
    public JobDescription duplicate(
            @PathVariable Long id) {

        return jobDescriptionService
                .duplicateJobDescription(id);
    }


    // --------------------------------------------------
    // VERSION HISTORY
    // --------------------------------------------------

    @GetMapping("/{id}/versions")
    public List<JobDescriptionVersion>
    getVersions(
            @PathVariable Long id) {

        return jobDescriptionService
                .getVersions(id);
    }


    // --------------------------------------------------
    // GET SINGLE VERSION
    // --------------------------------------------------

    @GetMapping("/{id}/versions/{versionId}")
    public JobDescriptionVersion
    getVersion(
            @PathVariable Long id,
            @PathVariable Long versionId) {

        return jobDescriptionService
                .getVersion(
                        id,
                        versionId
                );
    }


    // --------------------------------------------------
    // RESTORE VERSION
    // --------------------------------------------------

    @PostMapping(
            "/{id}/versions/{versionId}/restore"
    )
    public JobDescription restoreVersion(
            @PathVariable Long id,
            @PathVariable Long versionId) {

        return jobDescriptionService
                .restoreVersion(
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

        jobDescriptionService
                .deleteJobDescription(id);
    }
}