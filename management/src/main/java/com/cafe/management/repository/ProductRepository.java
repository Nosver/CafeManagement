package com.cafe.management.repository;

import com.cafe.management.model.Product;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
    Optional<Product> findProductByName(String name);
    Optional<Product> findProductById(Long id);

}
