package com.cafe.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.management.model.Stock;
import com.cafe.management.repository.StockRepository;

import jakarta.transaction.Transactional;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public Stock addStock(Stock stock){
       return stockRepository.save(stock);
    }
    
    @Transactional
    public void updateStockById(Long stockId, Stock updatedStock) {
        Stock existingStock = stockRepository.findById(stockId).orElseThrow();
        if (existingStock != null) {
            existingStock.setQuantity(updatedStock.getQuantity());
            existingStock.setStockUnit(updatedStock.getStockUnit());
            existingStock.setStockName(updatedStock.getStockName());
            existingStock.setUnitPrice(updatedStock.getUnitPrice());
            stockRepository.save(existingStock);
        } else {
            throw new IllegalArgumentException("Stock with id " + stockId + " not found.");
        }
    }
    
    public List<Stock> getAllStocks(){
    	return stockRepository.findAll();
    }



    
}
