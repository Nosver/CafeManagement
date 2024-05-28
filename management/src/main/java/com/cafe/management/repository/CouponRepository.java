package com.cafe.management.repository;

import com.cafe.management.model.Coupon;
import com.cafe.management.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long>{
    List<Coupon> findByUserId(Long userId);
}
