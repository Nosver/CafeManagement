package com.cafe.management.controller;

import com.cafe.management.dto.UserRoleCount;
import com.cafe.management.model.AuthenticationResponse;
import com.cafe.management.model.Cart;
import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;
import com.cafe.management.service.CouponService;
import com.cafe.management.service.UserService;

import java.rmi.ServerError;
import java.util.List;

import com.stripe.model.tax.Registration;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CouponService couponService;

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
            userService.sendCoupons(coupon);
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

    @GetMapping("/customer_only/getMyCoupons")
    public ResponseEntity<List<Coupon>> getMyCoupons(){
        try {
            return ResponseEntity.ok(couponService.findByUserId(getUser().getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/employee_and_admin/updateEmployee")
    public ResponseEntity<User> updateEmployee(
            @RequestBody User request) {
        if (request.getRole() == Role.CUSTOMER) {
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

    @PostMapping("employee_and_admin/updatePassword")
    public ResponseEntity<Boolean> updatePasswordErp( @RequestBody User password){
        User user=getUser();
        try {
            userService.updatePassword(user, password.getPassword());
            return ResponseEntity.ok(Boolean.TRUE);
        }catch (Exception e){
            return ResponseEntity.ok(Boolean.FALSE);

        }

    }

    @PostMapping("customer_only/updatePassword")
    public ResponseEntity<Boolean> updatePasswordCustomer( @RequestBody User password){
        User user=getUser();
        try {
            userService.updatePassword(user, password.getPassword());
            return ResponseEntity.ok(Boolean.TRUE);
        }catch (Exception e){
            return ResponseEntity.ok(Boolean.FALSE);

        }

    }

    @PostMapping("employee_and_admin/updateUserProfile")
    public ResponseEntity<User> updateUserProfile(@RequestBody User user){
        try{
            return ResponseEntity.ok(userService.updateAdminEmployeeProfile(user));
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    @PostMapping("employee_and_admin/updateAvatar")
    public ResponseEntity<Boolean> updateAvatarErp(@RequestBody User user){
        try {
            userService.updateAvatar(user);
            return ResponseEntity.ok(Boolean.TRUE);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("customer_only/updateAvatar")
    public ResponseEntity<Boolean> updateAvatarCustomer(@RequestBody User user){
        try {
            userService.updateAvatar(user);
            return ResponseEntity.ok(Boolean.TRUE);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().build();
        }
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

    @DeleteMapping("admin_only/deleteEmployee/{employeeId}")
    public void deleteEmployee(@PathVariable Long employeeId){
        userService.deleteEmployee(employeeId);
    }

    @GetMapping("customer_only/getAllCoupons/{customerId}")
    @Deprecated
    public ResponseEntity<List<Coupon>> getCoupon(@PathVariable Long customerId){
        try {
            return ResponseEntity.ok(couponService.findByUserId(customerId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof User) {
            User user = (User) authentication.getPrincipal();
            return user;
        }
        return null;
    }

    @PostMapping("/customer_only/updateUserProfile")
    public ResponseEntity<User> updateCustomerProfile(@RequestBody User updatedUser){
        try {
            return ResponseEntity.ok(userService.updateCustomer(updatedUser)) ;
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("employee_and_admin/user-role-count")
    public List<UserRoleCount> getUserRoleCounts() {
        return userService.getCompanyDetails();
    }
}
