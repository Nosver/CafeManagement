package com.cafe.management.service;

import com.cafe.management.model.Product;
import com.cafe.management.repository.ProductRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product){
        
        // if product already exists in db, dont add it again
        Optional<Product> existingProduct = productRepository.findProductByName(product.getName());
        if(existingProduct.isPresent()){
            return null;
        }

        return productRepository.save(product);
    }

}
