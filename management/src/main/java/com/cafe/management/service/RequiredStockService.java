package com.cafe.management.service;

import com.cafe.management.model.Product;
import com.cafe.management.model.RequiredStock;
import com.cafe.management.model.Stock;
import com.cafe.management.repository.RequiredStockRepository;
import com.cafe.management.repository.StockRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequiredStockService {

    @Autowired
    private RequiredStockRepository requiredStockRepository;

    @Autowired
    private StockService stockService;

    public RequiredStock addRequiredStock(RequiredStock requiredStock, Product product){
        if(requiredStock.getStock() == null){
            throw new IllegalArgumentException("Stock field does not exist");
        }
        Stock found =stockService.findByStockName(requiredStock.getStock().getStockName());


        if(found != null){
            requiredStock.setStock(found);
            requiredStock.setProduct(product);
            return  requiredStockRepository.save(requiredStock);
        }
        else{
            throw new IllegalArgumentException("Stock not found");
        }

    }

    public List<RequiredStock> addRequiredStocks(List<RequiredStock> requiredStock,Product product){
        List<RequiredStock> stockList = new ArrayList<RequiredStock>();
        for(RequiredStock reqStock : requiredStock){
            stockList.add(addRequiredStock(reqStock,product));
        }
        return stockList;
    }

    public RequiredStock findById(Long id){
        return requiredStockRepository.findById(id).orElse(null);
    }

    public void deleteRequiredStocks(Product product)  {

        requiredStockRepository.deleteRequiredStocksByProductId(product.getId());
    }
}
