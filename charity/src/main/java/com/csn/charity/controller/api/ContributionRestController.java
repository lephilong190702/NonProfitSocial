package com.csn.charity.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.csn.charity.model.UserContributeProject;
import com.csn.charity.service.implement.MailServiceImpl;
import com.csn.charity.service.interfaces.DonateService;


@RestController
@RequestMapping("/api")
public class ContributionRestController {
    @Autowired
    private DonateService donateService;
    @Autowired
    MailServiceImpl mailService;

    @PostMapping("/donateItem/{projectId}")
    @CrossOrigin
    public ResponseEntity<?> donateItems(@PathVariable Long projectId,
            @RequestBody UserContributeProject userContributeProject) {
        try {
            UserContributeProject contributeProject = this.donateService.donateItems(projectId, userContributeProject);
            this.mailService.sendDonateItemProjectEmail(contributeProject.getUser().getEmail());
            return new ResponseEntity<>(contributeProject, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
