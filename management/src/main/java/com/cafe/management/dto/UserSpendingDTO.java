package com.cafe.management.dto;

import lombok.Data;

@Data
public class UserSpendingDTO {
    private Long id;
    private String fullName;
    private String email;
    private Double totalSpending;

    public UserSpendingDTO(Long id, String fullName, String email, Double totalSpending) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.totalSpending = totalSpending;
    }

}