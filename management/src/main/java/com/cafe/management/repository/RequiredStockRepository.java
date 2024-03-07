package com.cafe.management.repository;

import com.cafe.management.model.RequiredStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequiredStockRepository extends JpaRepository<RequiredStock,Long> {
}
