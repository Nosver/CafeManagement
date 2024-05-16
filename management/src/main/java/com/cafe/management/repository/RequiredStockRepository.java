package com.cafe.management.repository;

import com.cafe.management.model.RequiredStock;
import com.cafe.management.model.Stock;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RequiredStockRepository extends JpaRepository<RequiredStock,Long> {

    Optional<RequiredStock> findByStock(Stock stock);
}
