package com.wevolve.jobdescription.repository;

import com.wevolve.jobdescription.model.JobDescriptionVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobDescriptionVersionRepository
        extends JpaRepository<JobDescriptionVersion, Long> {

    List<JobDescriptionVersion>
    findByJobDescriptionIdOrderByVersionNumberDesc(
            Long jobDescriptionId
    );

    Optional<JobDescriptionVersion>
    findByIdAndJobDescriptionId(
            Long id,
            Long jobDescriptionId
    );

    Optional<JobDescriptionVersion>
    findTopByJobDescriptionIdOrderByVersionNumberDesc(
            Long jobDescriptionId
    );

    void deleteByJobDescriptionId(
            Long jobDescriptionId
    );
}