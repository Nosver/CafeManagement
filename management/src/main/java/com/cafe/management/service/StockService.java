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
    public void updateStockByName(String stockName, Stock updatedStock) {
        Stock existingStock = stockRepository.findByStockName(stockName);
        if (existingStock != null) {
            existingStock.setQuantity(updatedStock.getQuantity());
            existingStock.setStockUnit(updatedStock.getStockUnit());

            stockRepository.save(existingStock);
        } else {
            throw new IllegalArgumentException("Stock with name " + stockName + " not found.");
        }
    }
    
    public List<Stock> getAllStocks(){
    	return stockRepository.findAll();
    }
}
