package com.csn.charity.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.model.Skill;
import com.csn.charity.repository.SkillReposiroty;
import com.csn.charity.service.interfaces.SkillService;

@Service
public class SkillServiceImpl implements SkillService {
    @Autowired
    private SkillReposiroty skillReposiroty;

    @Override
    public Skill add(Skill skill) {
        return this.skillReposiroty.save(skill);
    }

    @Override
    public List<Skill> getAll() {
        return this.skillReposiroty.findAll();
    }

    @Override
    public Skill update(Long id, Skill skill) {
        Skill s = this.skillReposiroty.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy với ID: " + id));
        
        s.setName(skill.getName());
        return this.skillReposiroty.save(s);
    }

    @Override
    public void delete(Long id) {
        Skill skill = this.skillReposiroty.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy kỹ năng với ID: " + id));

        this.skillReposiroty.delete(skill);
    }

    @Override
    public Skill get(Long id) {
        return this.skillReposiroty.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy kỹ năng với ID: " + id));
    }

}
