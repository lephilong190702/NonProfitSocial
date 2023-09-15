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
@Table(name = "new")
public class NewEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "address")
    private String address;

    @Column(name = "content")
    private String content;

    @OneToMany(mappedBy = "news")
    private List<UserCommentNewEntity> comment = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private NewCategoryEntity category;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
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

    public NewCategoryEntity getCategory() {
        return category;
    }

    public void setCategory(NewCategoryEntity category) {
        this.category = category;
    }

    public List<UserCommentNewEntity> getComment() {
        return comment;
    }

    public void setComment(List<UserCommentNewEntity> comment) {
        this.comment = comment;
    }

    
    
}
