package com.csn.charity.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_contribute_project")
public class UserContributeProject implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "donate_amount", nullable = false)
    private BigDecimal donateAmount;

    @Column(name = "donate_item", nullable = false)
    private String donateItem;

    @Column(name = "donate_date", nullable = false)
    private LocalDate donateDate;

    @Column(name = "note")
    private String note;

    @Column(name = "address")
    private String address;

    @Column(name = "status")
    private String status;

    @Transient
    private List<MultipartFile> files;

    @OneToMany(mappedBy = "userContributeProject", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TransportImage> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "shipper_id")
    private User shipper;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ContributionCategory category;
}
