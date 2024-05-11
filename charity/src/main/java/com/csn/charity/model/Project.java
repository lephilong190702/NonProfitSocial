package com.csn.charity.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
@Table(name = "project")
public class Project implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    @NotBlank(message = "Không được bỏ trống")
    private String title;

    @Column(name = "address")
    private String address;

    @Column(name = "content", nullable = false, length = 10000)
    @Lob
    @NotBlank(message = "Không được bỏ trống")
    private String content;

    @Column(name = "contributed_amount")
    private BigDecimal contributedAmount;

    @Column(name = "total_amount", nullable = false)
    @DecimalMin(value = "10000", message = "Giá trị phải lớn hơn 10000")
    private BigDecimal totalAmount;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "status")
    private Boolean status;

    @Transient
    private List<MultipartFile> files;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProjectCategory category;
     
    @OneToMany(mappedBy = "project" )
    @JsonIgnore
    private List<UserContributeProject> contributions = new ArrayList<>();
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ProjectImage> images = new ArrayList<>();
    
    @OneToMany(mappedBy = "project")
    @JsonIgnore
    private List<UserVolunteerProject> volunteers = new ArrayList<>();

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    private List<UserRatingProject> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    private List<Address> addresses = new ArrayList<>();
}
