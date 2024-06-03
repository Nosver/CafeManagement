package com.cafe.management.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.management.model.Cart;
import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.service.CartService;
import com.cafe.management.service.CouponService;
import com.cafe.management.service.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
public class CouponController {

    @Autowired
    private CouponService couponService;

    @Autowired
    private CartService cartService;

    private User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof User) {
            User user = (User) authentication.getPrincipal();
            return user;
        }
        return null;
    }

    @DeleteMapping("/customer_only/expendCoupon/{couponId}")
    public ResponseEntity<Long> expendCoupon(@PathVariable Long couponId){

        Optional<Cart> activeCart = cartService.getActiveCartByUserId(getUser().getId());

        try {
            couponService.expendCoupon(couponId, activeCart.get());
            return ResponseEntity.ok(couponId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    
}
