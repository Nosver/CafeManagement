package com.cafe.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.repository.CouponRepository;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    public Coupon createCoupon(User customer, Coupon coupon){
        
        coupon.setUser(customer);

        return couponRepository.save(coupon);
    }

    public List<Coupon> findByUserId(Long customerId) {
        return couponRepository.findByUserId(customerId);
    }
}
