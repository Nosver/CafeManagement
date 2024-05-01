package com.cafe.management.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
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

    private Double totalPrice;

    private String paymentSession;

    private String status;

    @CreationTimestamp
    private Timestamp createdAt;

    // customer

    //cartItemList

    /*@ManyToMany
    @JoinTable(name="product_chart",
    		joinColumns=@JoinColumn(name="chart_id"),
    		inverseJoinColumns = @JoinColumn(name ="product_id")
    		)
    private List<Product> productList;
    */

}
