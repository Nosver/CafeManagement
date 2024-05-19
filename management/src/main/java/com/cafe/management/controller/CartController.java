package com.cafe.management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.management.model.Cart;
import com.cafe.management.service.CartService;


@RestController
@RequestMapping("/public")
public class CartController {
    
    @Autowired
    private CartService cartService;

    @PostMapping("/createCart/{id}")
    public ResponseEntity<Cart> createCartById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(cartService.createCartById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
