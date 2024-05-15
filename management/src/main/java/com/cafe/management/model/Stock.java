package com.cafe.management.model;

import java.util.List;

import com.cafe.management.model.enums.StockUnit;
import jakarta.persistence.*;
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
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String stockName;

    private Double quantity;

    @Enumerated(EnumType.STRING)
    private StockUnit stockUnit;

    private Double unitPrice;

    @OneToMany(mappedBy = "stock")
    private List<RequiredStock> requiredStock;
}
