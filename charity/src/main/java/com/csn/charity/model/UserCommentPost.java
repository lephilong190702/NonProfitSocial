package com.csn.charity.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "user_comment_post")
public class UserCommentPost implements Serializable{
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @Column(name = "content", nullable = false, length = 500)
     private String content;

     @Column(name = "create_date", nullable = false)
     private Date createDate;

     @ManyToOne
     @JoinColumn(name = "user_id")
     private User user;

     @ManyToOne
     @JoinColumn(name = "post_id")
     private Post post;

     @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
     @JsonIgnore
     private List<UserCommentPost> replies = new ArrayList<>();

     @ManyToOne
     @JoinColumn(name = "reply_comment")
     @JsonIgnore
     private UserCommentPost comment;
}
