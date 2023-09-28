package com.csn.charity.service.interfaces;

import java.util.List;

import com.csn.charity.model.Skill;

public interface SkillService {
    Skill add(Skill skill);
    List<Skill> getAll();
    Skill get(Long id);
    Skill update(Long id, Skill skill);
    void delete(Long id);
}
