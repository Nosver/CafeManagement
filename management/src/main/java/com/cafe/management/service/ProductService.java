package com.cafe.management.service;

import com.cafe.management.dto.ProductDTO;
import com.cafe.management.model.Product;
import com.cafe.management.model.RequiredStock;
import com.cafe.management.model.Stock;
import com.cafe.management.repository.ProductRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RequiredStockService requiredStockService;

    @Autowired
    private StockService stocksService;

    public Product addProduct(Product product){
        
        Optional<Product> existingProduct = productRepository.findProductByName(product.getName());
        if(existingProduct.isPresent()){
            throw new IllegalArgumentException("Product Already exists");
        }

        if(product.getRequiredStocks().isEmpty()){
            throw new IllegalArgumentException("required stock is empty");
        }

        Double predictedStock= (double) calculatePredictedStocks(product.getRequiredStocks());

        product.setPredictedStock(predictedStock);
        Product p= productRepository.save(product);


        requiredStockService.addRequiredStocks(product.getRequiredStocks(),p) ;

        return p;

    }
    public void recalculatePredictedStocks(){
        List<Product> allProducts = getAllProducts();
        for(Product product:allProducts){
            int predictedStock=calculatePredictedStocks(product.getRequiredStocks());
            System.out.println(predictedStock);
            if(predictedStock!=100000.0){
                product.setPredictedStock((double)predictedStock);
                productRepository.save(product);
            }


        }
    }
    public int calculatePredictedStocks( List<RequiredStock> stocks) {
        Double prediction= 100000.0;
        List<Stock> stockList=stocksService.getAllRequiredStocks();
        for (RequiredStock wanted : stocks) {
            for (Stock stock : stockList) {
                if (wanted.getStock().getStockName().equals(stock.getStockName())) {
                    double amount= stock.getQuantity()/ wanted.getAmount();
                    prediction= Double.min(amount,prediction);

                }

            }

            }


        return prediction.intValue();

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
        Double predictedStock= (double) calculatePredictedStocks(product.getRequiredStocks());

        product.setPredictedStock(predictedStock);
       return productRepository.save(product);
    }

    public List<ProductDTO> getAllProductsWithoutRequiredStocks(){
        List<Product> products= productRepository.findAll();
        List<ProductDTO> res= new ArrayList<ProductDTO>();
        for (Product p: products){
            ProductDTO productdto = new ProductDTO();
            productdto.setCategory(p.getCategory());
            productdto.setName(p.getName());
            productdto.setDescription(p.getDescription());
            productdto.setPrice(p.getPrice());
            productdto.setId(p.getId());
            productdto.setImagePath(p.getImagePath());
            productdto.setIsMultisized(p.getIsMultisized());
            productdto.setPredictedStock(p.getPredictedStock());
            res.add(productdto);
        }
        return res;
    }

    public List<Product> getAllProducts(){
        return  productRepository.findAll();
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
