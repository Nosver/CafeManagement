package com.cafe.management.service;

import com.cafe.management.model.RequiredStock;
import com.cafe.management.model.Stock;
import com.cafe.management.repository.RequiredStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequiredStockService {

    @Autowired
    private RequiredStockRepository requiredStockRepository;

    @Autowired
    private StockService stockService;

    public void addRequiredStock(RequiredStock requiredStock){
        if(requiredStock.getStock() == null)return;
        Stock s=stockService.findByStockName(requiredStock.getStock().getStockName());

        System.out.println(s);
        if(s!=null){
            requiredStock.setStock(s);
            requiredStockRepository.save(requiredStock);
        }
        else{
            throw new IllegalArgumentException("Stock not found");
        }

    }

}
