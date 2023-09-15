package com.csn.charity.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class UserEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "role")
    private String role;

    @OneToOne(mappedBy = "user")
    @PrimaryKeyJoinColumn
    private ProfileEntity profile;

    @OneToMany(mappedBy = "user" )
    private List<UserContributeProjectEntity> contributions = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserCommentNewEntity> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserCommentPostEntity> commentss = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserReactPostEntity> reacts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserVolunteerProjectEntity> volunteers = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<PostEntity> posts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserReportPostEntity> reports = new ArrayList<>();
    
    @OneToMany(mappedBy = "user")
    private List<UserRatingProjectEntity> ratings = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "user_event", 
                joinColumns = @JoinColumn(name = "user_id"), 
                inverseJoinColumns = @JoinColumn(name = "event_id"))
    private List<EventEntity> events = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public ProfileEntity getProfile() {
        return profile;
    }

    public void setProfile(ProfileEntity profile) {
        this.profile = profile;
    }

    public List<UserContributeProjectEntity> getContributions() {
        return contributions;
    }

    public void setContributions(List<UserContributeProjectEntity> contributions) {
        this.contributions = contributions;
    }

    public List<EventEntity> getEvents() {
        return events;
    }

    public void setEvents(List<EventEntity> events) {
        this.events = events;
    }

    public List<UserCommentNewEntity> getComments() {
        return comments;
    }

    public void setComments(List<UserCommentNewEntity> comments) {
        this.comments = comments;
    }

    public List<UserCommentPostEntity> getCommentss() {
        return commentss;
    }

    public void setCommentss(List<UserCommentPostEntity> commentss) {
        this.commentss = commentss;
    }

    public List<UserReactPostEntity> getReacts() {
        return reacts;
    }

    public void setReacts(List<UserReactPostEntity> reacts) {
        this.reacts = reacts;
    }

    public List<UserVolunteerProjectEntity> getVolunteers() {
        return volunteers;
    }

    public void setVolunteers(List<UserVolunteerProjectEntity> volunteers) {
        this.volunteers = volunteers;
    }

    public List<PostEntity> getPosts() {
        return posts;
    }

    public void setPosts(List<PostEntity> posts) {
        this.posts = posts;
    }

    public List<UserReportPostEntity> getReports() {
        return reports;
    }

    public void setReports(List<UserReportPostEntity> reports) {
        this.reports = reports;
    }

    public List<UserRatingProjectEntity> getRatings() {
        return ratings;
    }

    public void setRatings(List<UserRatingProjectEntity> ratings) {
        this.ratings = ratings;
    }

    
    
}
