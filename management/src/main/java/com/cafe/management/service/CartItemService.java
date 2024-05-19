package com.cafe.management.service;

import com.cafe.management.model.CartItem;
import com.cafe.management.model.Product;
import com.cafe.management.repository.CartItemRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {

    @SuppressWarnings("unused")
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductService productService;


    public CartItem createCartItem(CartItem cartItem) throws IllegalAccessException{

        // Check if product exists
        Product found = productService.getProductByIdWithoutRequiredStocks(cartItem.getProduct().getId());

        if(found == null){
            throw new IllegalAccessException("Product by given id is not found!");
        }

        // Create cartItem
        cartItem.setProduct(found);

        return cartItemRepository.save(cartItem);
    }


}
