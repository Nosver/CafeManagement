package com.cafe.management.controller;

import com.cafe.management.model.enums.StockUnit;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
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

}
