package com.csn.charity.controller.api;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.csn.charity.dto.VolunteerRequestDTO;
import com.csn.charity.model.User;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.DonateService;
import com.csn.charity.service.interfaces.MailService;
import com.csn.charity.service.interfaces.SkillService;
import com.csn.charity.service.interfaces.VolunteerService;

@RestController
@RequestMapping("/api")
public class VolunteerRestController {
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private SkillService skillService;
    @Autowired
    private MailService mailService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DonateService donateService;

    @PostMapping("/volunteer/")
    @CrossOrigin
    public ResponseEntity<String> saveVolunteer(@RequestBody VolunteerRequestDTO requestDTO) {
        try {
            volunteerService.saveVolunteer(requestDTO);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                throw new SecurityException("Unauthorized access");
            }

            String username = authentication.getName();
            User user = userRepository.findByUsername(username);
            if (user == null) {
                throw new NoSuchElementException("Không tìm thấy người dùng");
            }
            if(user.getEmail() != null)
                mailService.sendConfirmEmail(user.getEmail());
            return ResponseEntity.ok("Đăng ký tình nguyện thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
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

    @GetMapping("/contributions/")
    @CrossOrigin
    public ResponseEntity<?> getAllContribution() {
        try {
            return new ResponseEntity<>(this.donateService.getAllContribute(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/contributions/{projectId}")
    @CrossOrigin
    public ResponseEntity<?> getContributionByProject(@PathVariable Long projectId) {
        try {
            return new ResponseEntity<>(this.donateService.getContributionByProject(projectId), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/transport/{shipperId}")
    @CrossOrigin
    public ResponseEntity<?> getTransportByShipper(@PathVariable Long shipperId) {
        try {
            return new ResponseEntity<>(this.donateService.getTransportByShipper(shipperId), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/transport/{transportId}")
    @CrossOrigin
    public ResponseEntity<?> updateTransport(@PathVariable(value = "transportId") Long transportId,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        try {
            this.donateService.shipperUpdateTransport(transportId, files);
            return ResponseEntity.ok("Đơn hàng đã được nhận thành công.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // @PostMapping("{projectId}/donate/")
    // public ResponseEntity<UserContributeProject> donate(@PathVariable(value =
    // "projectId") Long projectId, @RequestParam("donateAmount") BigDecimal
    // donateAmount) {
    // UserContributeProject userContributeProject = new UserContributeProject();
    // userContributeProject.setDonateAmount(donateAmount);

    // // Gọi service để xử lý đóng góp
    // UserContributeProject result = donateService.donate(projectId,
    // userContributeProject);

    // return new ResponseEntity<>(result, HttpStatus.CREATED);
    // }


}
