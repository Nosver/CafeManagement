package com.cafe.management.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Cart {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "cart_id")
    private List<Product> productList;

    private Double totalPrice;
}
