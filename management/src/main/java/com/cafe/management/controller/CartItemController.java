package com.cafe.management.controller;

import com.cafe.management.model.CartItem;
import com.cafe.management.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class CartItemController {

    @SuppressWarnings("unused")
    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/createCartItem")
    public ResponseEntity<CartItem> createCartItem(@RequestBody CartItem cartItem){
        try {
            return ResponseEntity.ok(cartItemService.createCartItem(cartItem));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

}
