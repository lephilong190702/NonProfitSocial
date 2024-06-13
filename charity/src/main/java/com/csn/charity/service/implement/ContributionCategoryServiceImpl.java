package com.csn.charity.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csn.charity.model.ContributionCategory;
import com.csn.charity.repository.ContributionCategoryRepository;
import com.csn.charity.service.interfaces.ContributionCategoryService;

@Service
public class ContributionCategoryServiceImpl implements ContributionCategoryService {
    @Autowired
    private ContributionCategoryRepository contributionCategoryRepository;

    @Override
    public List<ContributionCategory> getAll() {
        return this.contributionCategoryRepository.findAll();
    }
    
}
