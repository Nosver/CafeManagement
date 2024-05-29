package com.cafe.management.controller;

import com.cafe.management.model.enums.Position;
import com.cafe.management.model.enums.ProductCategory;
import com.cafe.management.model.enums.Status;
import com.cafe.management.model.enums.StockUnit;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/public")
public class EnumController {

    @GetMapping("/GetStockUnits")
    public List<String> getStockUnits() {
        return Arrays.stream(StockUnit.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @GetMapping("/getProductCategories")
    public List<String> getAllCategories() {
        return Arrays.stream(ProductCategory.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @GetMapping("/getAllPositions")
    public List<String> getAllPositions(){
        return Arrays.stream(Position.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
    @GetMapping("/getOrderStatus")
    public List<String> getOrderStatus(){
        return Arrays.stream(Status.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

}
