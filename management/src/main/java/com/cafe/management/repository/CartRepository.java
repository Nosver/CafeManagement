package com.cafe.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cafe.management.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
