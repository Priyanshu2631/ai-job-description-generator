package com.wevolve.jobdescription.repository;

import com.wevolve.jobdescription.model.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobDescriptionRepository
        extends JpaRepository<JobDescription, Long> {
}