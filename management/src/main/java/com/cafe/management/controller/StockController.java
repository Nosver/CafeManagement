package com.cafe.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.management.model.Stock;
import com.cafe.management.service.StockService;

@CrossOrigin
@RestController
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
}
