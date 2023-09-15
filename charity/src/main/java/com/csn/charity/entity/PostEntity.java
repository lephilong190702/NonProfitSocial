package com.csn.charity.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "post")
public class PostEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @Column(name = "create_date", nullable = false)
    private Date createDate;

    @ManyToMany
    @JoinTable(name = "post_tag", 
                joinColumns = @JoinColumn(name = "post_id"), 
                inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<TagEntity> tags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToMany(mappedBy = "post")
    private List<PostImageEntity> images = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<UserCommentPostEntity> comments = new ArrayList<>();
    
    @OneToMany(mappedBy = "post")
    private List<UserReactPostEntity> reacts = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<UserReportPostEntity> reports = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public List<TagEntity> getTags() {
        return tags;
    }

    public void setTags(List<TagEntity> tags) {
        this.tags = tags;
    }

    public List<PostImageEntity> getImages() {
        return images;
    }

    public void setImages(List<PostImageEntity> images) {
        this.images = images;
    }

    public List<UserCommentPostEntity> getComments() {
        return comments;
    }

    public void setComments(List<UserCommentPostEntity> comments) {
        this.comments = comments;
    }

    public List<UserReactPostEntity> getReacts() {
        return reacts;
    }

    public void setReacts(List<UserReactPostEntity> reacts) {
        this.reacts = reacts;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public List<UserReportPostEntity> getReports() {
        return reports;
    }

    public void setReports(List<UserReportPostEntity> reports) {
        this.reports = reports;
    }
    
    
}
