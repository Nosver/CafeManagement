package com.cafe.management.model;

import java.util.List;

import com.cafe.management.model.enums.ProductCategory;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private String description;

    private Boolean isMultisized;

    @OneToMany(mappedBy =  "product",cascade = CascadeType.REMOVE)
    private List<RequiredStock> requiredStocks;

    private String imagePath;

    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItem;

    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    @OneToMany(mappedBy = "product")
    private List<Comment> comments;

}
