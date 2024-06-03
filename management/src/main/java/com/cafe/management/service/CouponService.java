package com.cafe.management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cafe.management.model.Cart;
import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;
import com.cafe.management.repository.CouponRepository;

@Service
public class CouponService {

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private CartService cartService;

    public Coupon createCoupon(User customer, Coupon coupon) {

        coupon.setUser(customer);

        return couponRepository.save(coupon);
    }

    public List<Coupon> findByUserId(Long customerId) {
        // Check expire dates also
        return couponRepository.findByUserId(customerId);
    }
    

    public void expendCoupon(Long couponId, Cart cart){

        // Get coupon 
        System.out.println("------------> Coupon id to be deleted: " + couponId);
        Optional<Coupon> found = couponRepository.findById(couponId);
        
        // Get active cart
        cart.setDiscountPercent(found.get().getDiscountPercent());
        cartService.addCart(cart);
        
        // Delete applied coupon
        couponRepository.deleteById(found.get().getId());
        
        // Recalculate cart price
        cart.setTotalPrice(cartService.calculateTotalPrice(cart));
        cartService.addCart(cart);
    }
}
