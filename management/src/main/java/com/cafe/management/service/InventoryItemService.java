package com.cafe.management.service;

import com.cafe.management.model.InventoryItem;
import com.cafe.management.repository.InventoryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryItemService {
    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    public InventoryItem addInventoryItem(InventoryItem inventoryItem){
       return inventoryItemRepository.save(inventoryItem);
    }
}
