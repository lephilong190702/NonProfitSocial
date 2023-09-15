package com.csn.charity.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "project")
public class ProjectEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "address")
    private String address;

    @Column(name = "content")
    private String content;

    @Column(name = "contributed_amount")
    private BigDecimal contributedAmount;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "status")
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProjectCategoryEntity category;
     
    @OneToMany(mappedBy = "project" )
    private List<DonationEntity> donations = new ArrayList<>();
    
    @OneToMany(mappedBy = "project")
    private List<ProjectImageEntity> images = new ArrayList<>();
    
    @OneToMany(mappedBy = "project")
    private List<UserVolunteerProjectEntity> volunteers = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public BigDecimal getContributedAmount() {
        return contributedAmount;
    }

    public void setContributedAmount(BigDecimal contributedAmount) {
        this.contributedAmount = contributedAmount;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public ProjectCategoryEntity getCategory() {
        return category;
    }

    public void setCategory(ProjectCategoryEntity category) {
        this.category = category;
    }

    public List<DonationEntity> getDonations() {
        return donations;
    }

    public void setDonations(List<DonationEntity> donations) {
        this.donations = donations;
    }

    public List<ProjectImageEntity> getImages() {
        return images;
    }

    public void setImages(List<ProjectImageEntity> images) {
        this.images = images;
    }

    public List<UserVolunteerProjectEntity> getVolunteers() {
        return volunteers;
    }

    public void setVolunteers(List<UserVolunteerProjectEntity> volunteers) {
        this.volunteers = volunteers;
    }

    
    
}
