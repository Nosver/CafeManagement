package com.cafe.management.controller;

import com.cafe.management.model.InventoryItem;
import com.cafe.management.repository.InventoryItemRepository;
import com.cafe.management.service.InventoryItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InventoryItemController {

    @Autowired
    private InventoryItemService inventoryItemService;

    @PostMapping("/addInventoryItem")
    public InventoryItem addItem(@RequestBody InventoryItem inventoryItem){

        return inventoryItemService.addInventoryItem(inventoryItem);
    }
}
