package com.csn.charity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.csn.charity.model.Skill;
import com.csn.charity.service.interfaces.SkillService;

@Controller
public class SkillController {
    @Autowired
    private SkillService skillService;

    @GetMapping("/skills")
    public String getSkill(Model model) {
        model.addAttribute("skills", this.skillService.getAll());
        return "pages/skills";
    }
    @GetMapping("/admin/skill")
    public String addPage(Model model) {
        Skill skill = new Skill();
        model.addAttribute("skill", skill);
        return "pages/skill";
    }

    @GetMapping("/admin/skill/{id}")
    public String update(Model model, @PathVariable(value = "id") Long id) {
        model.addAttribute("skill", this.skillService.get(id));
        return "pages/skill";
    }

    @PostMapping("/admin/skill")
    public String addSkill(@ModelAttribute(value = "skill") Skill skill){
        if(skill.getId() == null)
            this.skillService.add(skill);
        else
            this.skillService.update(skill.getId(), skill);
        return "redirect:/skills";
    }
}
