package com.cafe.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.management.model.InventoryItem;
import com.cafe.management.service.InventoryItemService;

@CrossOrigin
@RestController
public class InventoryItemController {

    @Autowired
    private InventoryItemService inventoryItemService;

    @PostMapping("/addInventoryItem")
    public InventoryItem addItem(@RequestBody InventoryItem inventoryItem){
        return inventoryItemService.addInventoryItem(inventoryItem);
    }
    
    
    @GetMapping("/getAllItems")
    public List<InventoryItem> getAllItem(){
        return inventoryItemService.getAll();
    }
}
