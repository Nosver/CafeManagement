package com.cafe.management.service;

import com.cafe.management.dto.ProductDTO;
import com.cafe.management.model.Product;
import com.cafe.management.model.RequiredStock;
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
        
        Optional<Product> existingProduct = productRepository.findProductByName(product.getName());
        if(existingProduct.isPresent()){
            throw new IllegalArgumentException("Product Already exists");
        }

        if(product.getRequiredStocks().isEmpty()){
            throw new IllegalArgumentException("required stock is empty");
        }


        Product p= productRepository.save(product);


        requiredStockService.addRequiredStocks(product.getRequiredStocks(),p) ;

        return p;

    }



    public Product getProductById(Long id){
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProductById(Long id) throws IllegalArgumentException{
        productRepository.deleteById(id);
    }

    public Product updateProduct(Product updatedProduct){
        Long id = updatedProduct.getId();
        Product product = productRepository.findById(id).orElse(null);
        if(product == null){
            throw new IllegalArgumentException("Product with id " + id + " not found");
        }

        // Delete All Required Stock for given product
        requiredStockService.deleteRequiredStocks(product);

        //create new Required stocks
        List<RequiredStock> newRequiredStocks= requiredStockService.addRequiredStocks(updatedProduct.getRequiredStocks(),updatedProduct);

        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setDescription(updatedProduct.getDescription());
        product.setIsMultisized(updatedProduct.getIsMultisized());
        product.setImagePath(updatedProduct.getImagePath());
        product.setCategory(updatedProduct.getCategory());
        product.setRequiredStocks(newRequiredStocks);
       return productRepository.save(product);
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Product getProductByName(String name) {
        Optional<Product> found = productRepository.findProductByName(name);
        return found.get();
    }

    public Product getProductByIdWithoutRequiredStocks(Long id) {
        Optional<Product> found = productRepository.findById(id);
        if(found.isEmpty()){
            throw new IllegalArgumentException("Product with id " + id + " not found");
        }
        Product original = found.get();
        Product response = new Product();
        response.setId(original.getId());
        response.setName(original.getName());
        response.setPrice(original.getPrice());
        response.setDescription(original.getDescription());
        response.setIsMultisized(original.getIsMultisized());
        response.setImagePath(original.getImagePath());
        response.setCategory(original.getCategory());
        return response;
    }
    

}
