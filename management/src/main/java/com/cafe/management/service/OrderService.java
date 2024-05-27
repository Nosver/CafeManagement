package com.cafe.management.service;

import com.cafe.management.model.Cart;
import com.cafe.management.model.CartItem;
import com.cafe.management.model.Product;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class OrderService {

    public boolean isValidOrder(Cart cart) {
        Map<Product, Double> productMap = new HashMap<>();

        for (CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();
            double quantity = cartItem.getAmount();

            if (productMap.containsKey(product)) {
                productMap.put(product, productMap.get(product) + quantity);
            } else {
                productMap.put(product, quantity);
            }
        }
        for (Map.Entry<Product, Double> entry : productMap.entrySet()) {
            Product product = entry.getKey();
            double totalQuantity = entry.getValue();

            if (totalQuantity > product.getPredictedStock()) {
                return false;
            }
        }

        return true;


    }
}
