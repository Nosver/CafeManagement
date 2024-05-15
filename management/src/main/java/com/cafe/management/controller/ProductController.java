package com.cafe.management.controller;

import com.cafe.management.model.Product;
import com.cafe.management.service.ProductService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@OpenAPIDefinition(info = @Info(title = "API for Controller A", version = "1.0.0"), servers = @io.swagger.v3.oas.annotations.servers.Server(url = "/api/product"))
@RequestMapping("/public")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        Product resProduct = productService.addProduct(product);
        if(resProduct == null){
            return ResponseEntity.status(HttpStatus.FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(resProduct);
    }

    @PostMapping("/updateProductById")
    public ResponseEntity<Product> updateProductById(@RequestBody Product updatedProduct){
        productService.updateProductById(updatedProduct);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    
    @PostMapping("/deleteProductById")
    public ResponseEntity<Product> deleteProductById(@RequestBody Product product){
        try {
            productService.deleteProductById(product.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
