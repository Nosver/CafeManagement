package com.cafe.management.service;

import com.cafe.management.model.Product;
import com.cafe.management.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @SuppressWarnings("unused")
    @Autowired
    private RequiredStockService requiredStockService;

    public Product addProduct(Product product){
        
        // if product already exists in db, don not add it again
        Optional<Product> existingProduct = productRepository.findProductByName(product.getName());
        if(existingProduct.isPresent()){
            return null;
        }

        /*
        List<RequiredStock> found = product.getRequiredStocks();
        if(found == null){ 
            throw new IllegalArgumentException("Required stock is missing");
        }
        
        List<RequiredStock> requiredStocksToBeInserted = new ArrayList<RequiredStock>();
        for(RequiredStock requiredStock : found){
            RequiredStock req = requiredStockService.findById(requiredStock.getId());
            if(req != null){
                requiredStocksToBeInserted.add(req);
            }
        }
        product.setRequiredStocks(requiredStocksToBeInserted);
         */

        productRepository.save(product);
        return product;
    }

    public Product getProductById(Long id){
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProductById(Long id) throws IllegalArgumentException{
        productRepository.deleteById(id);
    }

    public void updateProductById(Product updatedProduct){
        Long id = updatedProduct.getId();
        Product product = productRepository.findById(id).orElse(null);
        if(product == null){
            throw new IllegalArgumentException("Product with id " + id + " not found");
        }

        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setDescription(updatedProduct.getDescription());
        product.setIsMultisized(updatedProduct.getIsMultisized());
        product.setImagePath(updatedProduct.getImagePath());
        product.setCategory(updatedProduct.getCategory());
    }

    public List<Product> getAllProducts(){
        return  productRepository.findAll();
    }
    

}
