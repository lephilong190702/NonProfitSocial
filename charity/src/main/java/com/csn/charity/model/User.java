package com.csn.charity.model;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true, nullable = false, length = 50)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @OneToOne(mappedBy = "user")
    @PrimaryKeyJoinColumn
    private Profile profile;

    @OneToMany(mappedBy = "user" )
    private List<UserContributeProject> contributions = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserCommentNew> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserCommentPost> commentss = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserReactPost> reacts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserVolunteerProject> volunteers = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UserReportPost> reports = new ArrayList<>();
    
    @OneToMany(mappedBy = "user")
    private List<UserRatingProject> ratings = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "role_id")
    private UserRole role;

    @ManyToMany
    @JoinTable(name = "user_event", 
                joinColumns = @JoinColumn(name = "user_id"), 
                inverseJoinColumns = @JoinColumn(name = "event_id"))
    private List<Event> events = new ArrayList<>();
}
