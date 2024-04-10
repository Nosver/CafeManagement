package com.cafe.management.model;

import java.util.List;

import com.cafe.management.model.enums.ProductCategory;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    
   /* @ManyToMany(mappedBy = "productList")
    private List<Cart> chart;*/
}
