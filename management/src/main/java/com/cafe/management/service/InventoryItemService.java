package com.cafe.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.management.model.InventoryItem;
import com.cafe.management.repository.InventoryItemRepository;

import jakarta.transaction.Transactional;

@Service
public class InventoryItemService {
    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    public InventoryItem addInventoryItem(InventoryItem inventoryItem){
       return inventoryItemRepository.save(inventoryItem);
    }
    
    @Transactional
    public void updateInventoryItemByName(String itemName, InventoryItem updatedItem) {
        InventoryItem existingItem = inventoryItemRepository.findByItemName(itemName);
        if (existingItem != null) {
            existingItem.setItemStock(updatedItem.getItemStock());
            existingItem.setItemUnit(updatedItem.getItemUnit());

            inventoryItemRepository.save(existingItem);
        } else {
            throw new IllegalArgumentException("Item with name " + itemName + " not found.");
        }
    }
}
