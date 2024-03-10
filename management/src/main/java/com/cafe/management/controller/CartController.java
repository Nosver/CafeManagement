package com.cafe.management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.management.model.Cart;
import com.cafe.management.service.CartService;


@RestController
public class CartController {
    
    @Autowired
    private CartService cartService;

    @PostMapping("/addCart")
    public Cart _addCart(@RequestBody Cart cart){
        return cartService.addCart(cart);
    }
}

/*

POSTMAN TEST BODY:

        {
            "productList": [
                {
                    "productCategory": "HOT_COFFE",
                    "price": 1200.0,
                    "requiredStocks": [],
                    "name": "Premium Arabic Milk Coffee",
                    "description": "A rich and creamy hot coffee made with high-quality Arabic beans. Perfect for a morning boost or an afternoon pick-me-up.",
                    "imagePath": "/path/to/image1.jpg"
                },
                {
                    "productCategory": "COLD_COFFE",
                    "price": 20.0,
                    "requiredStocks": [],
                    "name": "Refreshing Ice Tea",
                    "description": "A cool and refreshing ice tea made with freshly brewed tea and served chilled. The perfect drink to cool down on a hot day.",
                    "imagePath": "/path/to/image2.jpg"
                }
            ],
            "totalPrice": 1220.0
        }
 
 */
