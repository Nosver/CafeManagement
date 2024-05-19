package com.cafe.management.dto;

import com.cafe.management.model.enums.ProductCategory;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ProductDTO {

    private Long id;
    private String name;
    private Double price;
    private String description;
    private Boolean isMultisized;
    private String imagePath;
    private ProductCategory category;
}
