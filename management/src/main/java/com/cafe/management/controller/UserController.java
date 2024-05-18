package com.cafe.management.controller;

import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.service.UserService;

import java.rmi.ServerError;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/public")
public class UserController {

    @SuppressWarnings("unused")
    @Autowired
    private UserService userService;

    @GetMapping("/getAllCustomers")
    public ResponseEntity<List<User>> getAllCustomers(){
        List<User> customerList = userService.getAllCustomers();
        try {
            return ResponseEntity.ok(customerList);
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping("/sendCouponToEveryone")
    public ResponseEntity<Coupon> sendCoupon(@RequestBody Coupon coupon){

        try {
            userService.sendCoupon(coupon);
            return ResponseEntity.ok(coupon);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
