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
@Table(name = "user_comment_new")
public class UserCommentNewEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "create_date", nullable = false)
    private Date createDate;

    @OneToMany(mappedBy = "comment")
    private List<UserCommentNewEntity> comments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "reply_news")
    private UserCommentNewEntity comment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "new_id")
    private NewEntity news;

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

    public NewEntity getNews() {
        return news;
    }

    public void setNews(NewEntity news) {
        this.news = news;
    }

    public List<UserCommentNewEntity> getComments() {
        return comments;
    }

    public void setComments(List<UserCommentNewEntity> comments) {
        this.comments = comments;
    }

    public UserCommentNewEntity getComment() {
        return comment;
    }

    public void setComment(UserCommentNewEntity comment) {
        this.comment = comment;
    }

    

}
