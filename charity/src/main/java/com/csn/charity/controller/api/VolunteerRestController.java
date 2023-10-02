package com.csn.charity.controller.api;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.dto.VolunteerRequestDTO;
import com.csn.charity.model.Skill;
import com.csn.charity.model.UserContributeProject;
import com.csn.charity.service.interfaces.DonateService;
import com.csn.charity.service.interfaces.SkillService;
import com.csn.charity.service.interfaces.VolunteerService;

@RestController
@RequestMapping("/api")
public class VolunteerRestController {
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private DonateService donateService;
    @Autowired
    private SkillService skillService;

    @PostMapping("/volunteer/")
    @CrossOrigin
    public ResponseEntity<String> saveVolunteer(@RequestBody VolunteerRequestDTO requestDTO) {
        try {
            volunteerService.saveVolunteer(requestDTO);
            return ResponseEntity.ok("Đăng ký tình nguyện thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi trong quá trình đăng ký tình nguyện: " + e.getMessage());
        }
    }

    @GetMapping("/skills/")
    @CrossOrigin
    public ResponseEntity<?> getAllSkill() {
        try {
            return new ResponseEntity<>(this.skillService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    // @PostMapping("{projectId}/donate/")
    // public ResponseEntity<UserContributeProject> donate(@PathVariable(value = "projectId") Long projectId, @RequestParam("donateAmount") BigDecimal donateAmount) {
    //     UserContributeProject userContributeProject = new UserContributeProject();
    //     userContributeProject.setDonateAmount(donateAmount);

    //     // Gọi service để xử lý đóng góp
    //     UserContributeProject result = donateService.donate(projectId, userContributeProject);

    //     return new ResponseEntity<>(result, HttpStatus.CREATED);
    // }
}
