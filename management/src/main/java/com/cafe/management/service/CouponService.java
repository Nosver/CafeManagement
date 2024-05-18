package com.cafe.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.repository.CouponRepository;

@Service
public class CouponService {

    @Autowired
    CouponRepository couponRepository;

    public Coupon createCoupon(User customer, Coupon coupon){
        
        coupon.setUser(customer);

        
        return couponRepository.save(coupon);
    }
}
