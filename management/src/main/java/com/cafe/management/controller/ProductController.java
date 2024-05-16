package com.cafe.management.controller;

import com.cafe.management.model.Product;
import com.cafe.management.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        Product resProduct = productService.addProduct(product);
        System.out.println(product.getCategory());
        if(resProduct == null){
            return ResponseEntity.status(HttpStatus.FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(resProduct);
    }

    @PostMapping("/updateProductById")
    public ResponseEntity<Product> updateProductById(@RequestBody Product updatedProduct){
        productService.updateProductById(updatedProduct);
        try {
            productService.updateProductById(updatedProduct);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to update product");
        }
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

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/getProductByName") // Usage: http://XXXX/getProductByName?name=productname
    public ResponseEntity<Product> getProductByName(@RequestParam String name){
        Product product = productService.getProductByName(name);
        if(product == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(product);
    }
}
