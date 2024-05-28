package com.cafe.management.controller;

import java.util.List;

import com.cafe.management.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
    @Autowired
    private ProductService productService;



    @PostMapping("/addStock")
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock){
        try {
            return ResponseEntity.ok(stockService.addStock(stock));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/getAllStocks")
    public List<Stock> getAllStocks(){
        return stockService.getAllStocks();
    }

    @PostMapping("/updateStockById")
    public ResponseEntity<Stock> updateStockById(@RequestBody Stock updatedStock){
        try {
            stockService.updateStockById(updatedStock.getId(), updatedStock);
            productService.recalculatePredictedStocks();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(updatedStock);
    }

}