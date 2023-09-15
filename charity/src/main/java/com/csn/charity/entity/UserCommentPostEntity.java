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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_comment_post")
public class UserCommentPostEntity implements Serializable{
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @Column(name = "content")
     private String content;

     @Column(name = "create_date")
     private Date createDate;

     @ManyToOne
     @JoinColumn(name = "user_id")
     private UserEntity user;

     @ManyToOne
     @JoinColumn(name = "post_id")
     private PostEntity post;

     @OneToMany(mappedBy = "comment")
     private List<UserCommentPostEntity> comments = new ArrayList<>();

     @ManyToOne
     @JoinColumn(name = "reply_comment")
     private UserCommentPostEntity comment;

     public Long getId() {
          return id;
     }

     public String getContent() {
          return content;
     }

     public void setContent(String content) {
          this.content = content;
     }

     public Date getCreateDate() {
          return createDate;
     }

     public void setCreateDate(Date createDate) {
          this.createDate = createDate;
     }

     public UserEntity getUser() {
          return user;
     }

     public void setUser(UserEntity user) {
          this.user = user;
     }

     public PostEntity getPost() {
          return post;
     }

     public void setPost(PostEntity post) {
          this.post = post;
     }

     public List<UserCommentPostEntity> getComments() {
          return comments;
     }

     public void setComments(List<UserCommentPostEntity> comments) {
          this.comments = comments;
     }

     public UserCommentPostEntity getComment() {
          return comment;
     }

     public void setComment(UserCommentPostEntity comment) {
          this.comment = comment;
     }

     
}
