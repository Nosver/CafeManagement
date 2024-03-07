package com.cafe.management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.management.model.InventoryItem;
import com.cafe.management.service.InventoryItemService;

@RestController
public class InventoryItemController {

	@Autowired
	private InventoryItemService inventoryItemService;

	@PostMapping("/addInventoryItem")
	public InventoryItem addItem(@RequestBody InventoryItem inventoryItem) {

		return inventoryItemService.addInventoryItem(inventoryItem);
	}

	@PutMapping("/updateInventoryItem")
	public void updateInventory(@RequestBody InventoryItem inventoryItem) {
		try {
			inventoryItemService.updateInventoryItemByName(inventoryItem.getItemName(), inventoryItem);
		} catch (Exception e) {

		}

	}
}
