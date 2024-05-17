package com.cafe.management.repository;

import com.cafe.management.model.Product;
import com.cafe.management.model.RequiredStock;
import com.cafe.management.model.Stock;

import java.util.Optional;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RequiredStockRepository extends JpaRepository<RequiredStock,Long> {

    Optional<RequiredStock> findByStock(Stock stock);
    void deleteByProduct(Product product);
    @Modifying
    @Transactional
    @Query("DELETE FROM RequiredStock rs WHERE rs.product.id = :productId")
    void deleteRequiredStocksByProductId(@Param("productId") Long productId);
}
