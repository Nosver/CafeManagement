package com.cafe.management.controller;

import com.cafe.management.model.CartItem;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.ProductSize;
import com.cafe.management.repository.CartItemRepository;
import com.cafe.management.service.CartItemService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.management.RuntimeErrorException;
import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("")
public class CartItemController {

    @SuppressWarnings("unused")
    @Autowired
    private CartItemService cartItemService;



    @PostMapping("/customer_only/addCartItem")
    public ResponseEntity<CartItem> addCartItem(@RequestBody CartItem cartItem) {
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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user= new User();
        if (authentication.getPrincipal() instanceof User) {
            user = (User) authentication.getPrincipal();

        }

        try {
            return ResponseEntity.ok(cartItemService.addCartItem(cartItem, user.getId()));
        } catch (IllegalArgumentException | NameNotFoundException c) {
            c.printStackTrace();
            return ResponseEntity.status(417).build();


        }
    }

    @PostMapping("/customer_only/updateCartItem")
    public ResponseEntity<CartItem> updateCartItem(@RequestBody CartItem cartItem){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user= new User();
        if (authentication.getPrincipal() instanceof User) {
            user = (User) authentication.getPrincipal();

        }

        try {
            return ResponseEntity.ok(cartItemService.updateCartItem(cartItem, user.getId()));
        } catch (Exception e) {
            // Not enough stock
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/customer_only/deleteCartItem/{id}")
    public ResponseEntity<Boolean> deleteCartItemById(@PathVariable("id") Long cartItemId ){
        System.out.println("------------------------> Customer request for" + cartItemId + " cart item deletion!");
        try {
            cartItemService.deleteCartItemById(cartItemId);
            return ResponseEntity.ok(Boolean.TRUE);
        }catch (Exception e){
            return ResponseEntity.status(401).body(Boolean.FALSE);
        }
    }


    @GetMapping("employee_and_admin/top-products")
    public List<Map<String, Object>> getTop3ProductsAndOthers() {
        return cartItemService.getTop3ProductsAndOthers();
    }
}
