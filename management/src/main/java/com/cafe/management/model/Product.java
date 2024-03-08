package com.cafe.management.model;

import com.cafe.management.model.enums.ProductCategory;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private ProductCategory productCategory;

    private Double price;

    @OneToMany(mappedBy =  "product")
    private List<RequiredStock> requiredStocks;

    private String name;

    private String description;

    private String imagePath;
}
