package com.cafe.management.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Date expireDate;

    private Double discountPercent;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;

}
