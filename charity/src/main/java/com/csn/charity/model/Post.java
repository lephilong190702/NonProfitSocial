package com.csn.charity.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "post")
public class Post implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", nullable = false, length = 1000)
    private String content;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @Column(name = "create_date", nullable = false)
    private Date createDate;

    @ManyToMany
    @JoinTable(name = "post_tag", 
                joinColumns = @JoinColumn(name = "post_id"), 
                inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @JsonIgnore
    private List<Tag> tags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "post")
    private List<PostImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<UserCommentPost> comments = new ArrayList<>();
    
    @OneToMany(mappedBy = "post")
    private List<UserReactPost> reacts = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<UserReportPost> reports = new ArrayList<>();
}
