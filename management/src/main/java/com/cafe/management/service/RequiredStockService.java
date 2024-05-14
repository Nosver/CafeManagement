package com.cafe.management.service;

import com.cafe.management.model.RequiredStock;
import com.cafe.management.repository.RequiredStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequiredStockService {

    @Autowired
    private RequiredStockRepository requiredStockRepository;

    public void addRequiredStock(RequiredStock requiredStock){
        if(requiredStock.getInventoryItem() == null)return;
        requiredStockRepository.save(requiredStock);
    }

}
