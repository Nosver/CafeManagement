package com.cafe.management.service;

import com.cafe.management.model.RequiredStock;
import com.cafe.management.model.Stock;
import com.cafe.management.repository.RequiredStockRepository;
import com.cafe.management.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequiredStockService {

    @Autowired
    private RequiredStockRepository requiredStockRepository;

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private StockService stockService;
    public void addRequiredStock(RequiredStock requiredStock){
        if(requiredStock.getStock() == null)return;
        Stock s=stockRepository.findByStockName(requiredStock.getStock().getStockName());
        if(s!=null){

            requiredStock.setStock(s);
            requiredStockRepository.save(requiredStock);
        }
        else{

            requiredStock.setStock(stockService.addStock(requiredStock.getStock()));
            requiredStockRepository.save(requiredStock);
        }

    }

}
