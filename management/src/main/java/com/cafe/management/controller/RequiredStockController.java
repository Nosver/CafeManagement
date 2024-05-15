package com.cafe.management.controller;

import com.cafe.management.model.RequiredStock;
import com.cafe.management.service.RequiredStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class RequiredStockController {

    @Autowired
    private RequiredStockService requiredStockService;

    @PostMapping("/addRequiredStock")
    public void addRequiredStock(@RequestBody RequiredStock requiredStock){
        requiredStockService.addRequiredStock(requiredStock);
    }
    


}
