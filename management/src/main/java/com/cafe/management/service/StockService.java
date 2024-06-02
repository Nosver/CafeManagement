package com.cafe.management.service;

import java.util.ArrayList;
import java.util.List;

import com.cafe.management.model.Cart;
import com.cafe.management.model.CartItem;
import com.cafe.management.model.Product;
import com.cafe.management.model.RequiredStock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.cafe.management.model.Stock;
import com.cafe.management.repository.StockRepository;

import jakarta.transaction.Transactional;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    private ProductService productService;

    StockService(@Lazy ProductService productService) {
        this.productService = productService;
    }

    @Transactional
    public Stock addStock(Stock stock) {
        if (stockRepository.findByStockName(stock.getStockName()) != null) {
            throw new IllegalArgumentException("Stock already exists");
        }
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

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock findByStockName(String stockName) {
        return stockRepository.findByStockName(stockName);
    }

    public List<Stock> getAllRequiredStocks() {
        return stockRepository.findAll();
    }

    public void decreaseStock(Cart cart) {
        for (CartItem c : cart.getCartItems()) {
            for (RequiredStock req : c.getProduct().getRequiredStocks()) {
                req.getStock().setQuantity(req.getStock().getQuantity() - (req.getAmount() * c.getAmount()));
                updateStockById(req.getStock().getId(), req.getStock());
            }
        }
    }

    public void increaseStock(Cart cart) {
        for (CartItem c : cart.getCartItems()) {
            for (RequiredStock req : c.getProduct().getRequiredStocks()) {
                req.getStock().setQuantity(req.getStock().getQuantity() + (req.getAmount() * c.getAmount()));
                updateStockById(req.getStock().getId(), req.getStock());
            }
        }
    }

    public List<Stock> getCriticalStocks() {
        return stockRepository.getCriticalStocks();
    }
}
