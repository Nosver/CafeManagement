package com.cafe.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cafe.management.model.Stock;

import jakarta.transaction.Transactional;

public interface StockRepository extends JpaRepository<Stock,Long> {
	
	@Modifying
    @Transactional
    @Query("UPDATE Stock i SET i = :updatedStock WHERE i.stockName = :stockName")
    int updateStockByName(@Param("stockName") String stockName, @Param("updatedStock") Stock updatedStock);

	public Stock findByStockName(String stockName);
}
