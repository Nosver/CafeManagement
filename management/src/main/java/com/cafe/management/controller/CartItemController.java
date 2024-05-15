package com.cafe.management.controller;

import com.cafe.management.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CartItemController {

    @SuppressWarnings("unused")
    @Autowired
    private CartItemService cartItemService;

}
