package com.cafe.management.controller;

import com.cafe.management.model.CartItem;
import com.cafe.management.model.enums.ProductSize;
import com.cafe.management.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/public")
public class TestController {

    @Autowired
    private CartItemRepository cartItemRepository;
    @GetMapping("/getCartItemByCartIdAndProductId")
    public ResponseEntity<Optional<CartItem>> getCartItemByCartIdAndProductId(@RequestParam Long cartId, @RequestParam Long productId, @RequestParam ProductSize size){
        return ResponseEntity.ok(cartItemRepository.getCartItemByCartIdAndProductId(cartId,productId,size));
    }
}
