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



    @PostMapping("/addCartItem")
    public ResponseEntity<CartItem> addCartItem(@RequestBody CartItem cartItem){
        /*
        Usage:

         cartItem: {
                cart: {
                    user: {
                        id: 231231
                    }
                }
            }

         */

        return ResponseEntity.ok(cartItemService.addCartItem(cartItem));
    }

}
