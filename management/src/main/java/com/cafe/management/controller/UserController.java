package com.cafe.management.controller;

import com.cafe.management.model.AuthenticationResponse;
import com.cafe.management.model.Cart;
import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;
import com.cafe.management.service.UserService;

import java.rmi.ServerError;
import java.util.List;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/employee_and_admin/getAllCustomers")
    public ResponseEntity<List<User>> getAllCustomers() {
        List<User> customerList = userService.getAllCustomers();
        try {
            return ResponseEntity.ok(customerList);
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping("/employee_and_admin/sendCouponToEveryone")
    public ResponseEntity<Coupon> sendCoupon(@RequestBody Coupon coupon) {

        try {
            userService.sendCoupon(coupon);
            return ResponseEntity.ok(coupon);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/admin_only/getAllEmployees")
    public ResponseEntity<List<User>> getAllEmployees() {

        try {
            List<User> employeeList = userService.getAllEmployees();
            return ResponseEntity.ok(employeeList);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/employee_and_admin/updateEmployee")
    public ResponseEntity<User> updateEmployee(
            @RequestBody User request) {
        if (request.getRole() != Role.EMPLOYEE) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.updateUser(request));
    }

    @PostMapping("/admin_only/updateAdmin")
    public ResponseEntity<User> updateAdmin(
            @RequestBody User request) {
        if (request.getRole() != Role.ADMIN) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.updateUser(request));
    }

    @PostMapping("/customer_only/updateCustomer")
    public ResponseEntity<User> updateCustomer(
            @RequestBody User request) {
        if (request.getRole() != Role.CUSTOMER) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.updateUser(request));
    }

    @GetMapping("/public/whoami")
    public ResponseEntity<User> whoAmI() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if the principal is an instance of User
        if (authentication.getPrincipal() instanceof User) {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.notFound().build();
    }

}
