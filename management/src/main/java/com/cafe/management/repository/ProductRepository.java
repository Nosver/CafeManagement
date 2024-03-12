package com.cafe.management.repository;

import com.cafe.management.model.Product;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ProductRepository extends JpaRepository<Product,Long> {

    Optional<Product> findByName(String name);

}
