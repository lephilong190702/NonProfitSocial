package com.csn.charity.model;

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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "new")
public class New implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "create_date", nullable = false)
    private Date createDate;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "content", nullable = false, length = 500)
    private String content;

    @OneToMany(mappedBy = "news")
    private List<UserCommentNew> comment = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private NewCategory category;
}
