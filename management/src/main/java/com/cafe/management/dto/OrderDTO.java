package com.cafe.management.dto;

import com.cafe.management.model.Cart;
import com.cafe.management.model.CartItem;
import com.cafe.management.model.enums.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OrderDTO {
    private Long id;

    private Double totalPrice;

    private List<CartItem> cartItems;

    private Status status;

    private Timestamp createdAt;

    private String userName;

}
