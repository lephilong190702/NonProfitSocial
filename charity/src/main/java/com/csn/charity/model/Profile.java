package com.csn.charity.model;

import java.io.Serializable;
import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
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
@Table(name = "profile")
public class Profile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name",  length = 20)
    private String firstName;

    @Column(name = "last_name", length = 10)
    private String lastName;

    @Column(name = "phone", length = 10)
    private String phone;

    @Column(name = "career", length = 500)
    private String carrer;

    @Column(name = "dob", length = 500)
    private Date dob;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "avatar")
    private String avatar;

    @Transient
    private MultipartFile file;
    
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
