package com.cafe.management.service;

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

    public RequiredStock addRequiredStock(RequiredStock requiredStock){

        // Check for which product requiredProduct belong to

        // Check if stock exists
        if(requiredStock.getStock() == null){
            throw new IllegalArgumentException("Body does not contain stock!");
        }

        // Check if stock exists in database
        if(stockService.findByStockName(requiredStock.getStock().getStockName()) == null){
            throw new IllegalArgumentException("Given stock name does not exists in database!");
        }

        // If required stock already exist change it
        Optional<RequiredStock> found = requiredStockRepository.findByStock(requiredStock.getStock());

        if(found.isPresent()){ 
            RequiredStock founded = found.get();
            founded.setProduct(requiredStock.getProduct());
            founded.setAmount(requiredStock.getAmount());
            founded.setStock(requiredStock.getStock());

            return requiredStockRepository.save(founded);
        }

        // If not create new one
        
        Stock toBeCreated = stockService.findByStockName(requiredStock.getStock().getStockName());

        if(toBeCreated != null){
            requiredStock.setStock(toBeCreated);
            return requiredStockRepository.save(requiredStock);
        }
        else{
            throw new IllegalArgumentException("Stock not found in database");
        }

    }

    public List<RequiredStock> addRequiredStock(List<RequiredStock> requiredStock){
        List<RequiredStock> stockList = new ArrayList<RequiredStock>();
        for(RequiredStock reqStock : requiredStock){
            stockList.add(addRequiredStock(reqStock));
        }
        return stockList;
    }

    public RequiredStock findById(Long id){
        return requiredStockRepository.findById(id).orElse(null);
    }

}
