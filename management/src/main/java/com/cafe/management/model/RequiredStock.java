package com.cafe.management.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequiredStock {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;

    private Double requiredAmount;

    @OneToOne
    private Stock stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

}
