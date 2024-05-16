package com.cafe.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cafe.management.model.Stock;
import com.cafe.management.service.StockService;

@RestController
@RequestMapping("/employee_and_admin")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping("/addStock")
    public Stock addStock(@RequestBody Stock stock){
        return stockService.addStock(stock);
    }

    @GetMapping("/getAllStocks")
    public List<Stock> getAllStocks(){
        return stockService.getAllStocks();
    }

    @PostMapping("/updateStockById")
    public ResponseEntity<Stock> updateStockById(@RequestBody Stock updatedStock){
        try {
            stockService.updateStockById(updatedStock.getId(), updatedStock);
        } catch (Exception e) {
            System.err.println("Stock with id " + updatedStock.getId() + " not found.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(updatedStock);
    }

}