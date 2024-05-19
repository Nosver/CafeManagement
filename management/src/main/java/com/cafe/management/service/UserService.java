package com.cafe.management.service;

import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;
import com.cafe.management.repository.UserRepository;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

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

}
