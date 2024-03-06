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
    @GeneratedValue
    private Long id;

    private Double requiredAmount;

    @ManyToOne
    private InventoryItem inventoryItem;
}
