package com.cafe.management.service;

import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;
import com.cafe.management.repository.UserRepository;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CouponService couponService;

    public List<User> getAllCustomers() {
        List<User> asd =  userRepository.findAllByRole(Role.CUSTOMER);
        //System.out.println(asd);
        return asd;
    }

    public void sendCoupon(User Customer, Coupon coupon){

        // Append coupon
        try {
            Customer.getCoupons().add(coupon);
            Coupon newCoupon = couponService.createCoupon(Customer, coupon);
            Customer.getCoupons().add(newCoupon);
            userRepository.save(Customer);
        } catch (Exception e) {
            throw new RuntimeException("Failed to append coupon to customer: " + e.getMessage());
        }

    }

    public void sendCoupon(Coupon coupon){

        // Get all customers
        List<User> customerList = userRepository.findAllByRole(Role.CUSTOMER);
        System.out.println(customerList);
        for(User customer : customerList){

            sendCoupon(customer, coupon);
        }
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllEmployees(){
        return userRepository.findAllByRole(Role.EMPLOYEE);
    }

    public User updateUser(User user){

        Optional<User> nUser  = userRepository.findById(user.getId());

        if(nUser.isEmpty()) throw new IllegalArgumentException("User not found!");

        nUser.get().setFullName(user.getFullName());
        nUser.get().setAddress(user.getAddress());
        nUser.get().setAvatar(user.getAvatar());
        nUser.get().setEmail(user.getEmail());
        nUser.get().setPassword(passwordEncoder.encode(user.getPassword()));
        nUser.get().setPhoneNumber(user.getPhoneNumber());
        nUser.get().setPosition(user.getPosition());
        nUser.get().setSalary(user.getSalary());

        System.out.print(nUser.get());

        return userRepository.save(nUser.get());
    }


}
