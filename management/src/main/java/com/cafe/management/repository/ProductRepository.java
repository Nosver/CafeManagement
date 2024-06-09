package com.cafe.management.repository;

import com.cafe.management.dto.ProductDTO;
import com.cafe.management.model.Product;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findProductByName(String name);
    Optional<Product> findProductById(Long id);

    @Query("Select p From Product p WHERE p.predictedStock > 0")
    public List<Product> getAllProductsWithStocks();

    @Query("Select p From Product p")
    public List<Product> getAllProductsWithStocksForERP();

}
