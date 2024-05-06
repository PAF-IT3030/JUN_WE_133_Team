package com.PAF.rest.Repo;

import com.PAF.rest.Models.Template;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemplateRepo extends JpaRepository<Template, Long> {

    void saveTemps(Template template);

}
