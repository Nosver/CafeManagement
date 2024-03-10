package com.cafe.management.service;

import com.cafe.management.model.Cart;
import com.cafe.management.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart addCart(Cart cart){
        return cartRepository.save(cart);
    }
    
}
