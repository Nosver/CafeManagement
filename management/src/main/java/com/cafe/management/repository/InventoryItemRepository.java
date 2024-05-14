package com.cafe.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cafe.management.model.InventoryItem;

import jakarta.transaction.Transactional;

public interface InventoryItemRepository extends JpaRepository<InventoryItem,Long> {
	
	@Modifying
    @Transactional
    @Query("UPDATE InventoryItem i SET i = :updatedItem WHERE i.itemName = :itemName")
    int updateItemByName(@Param("itemName") String itemName, @Param("updatedItem") InventoryItem updatedItem);

	public InventoryItem findByItemName(String itemName);
}
