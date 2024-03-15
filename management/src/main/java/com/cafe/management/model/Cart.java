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

    @ManyToMany
    @JoinTable(name="product_chart",
    		joinColumns=@JoinColumn(name="chart_id"),
    		inverseJoinColumns = @JoinColumn(name ="product_id")
    		)
    private List<Product> productList;

    private Double totalPrice;
}
