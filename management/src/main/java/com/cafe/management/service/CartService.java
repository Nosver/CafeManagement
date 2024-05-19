package com.cafe.management.service;

import com.cafe.management.model.Cart;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;
import com.cafe.management.model.enums.Status;
import com.cafe.management.repository.CartRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    public Cart addCart(Cart cart){
        return cartRepository.save(cart);
    }

    public Cart createCartById(Long id) {
        Optional<User> found = userService.findById(id);
        if(found.isPresent() == false){
            throw new IllegalAccessError("User by " + id + "not found!");
        }

        if(found.get().getRole() != Role.CUSTOMER){
            throw new IllegalAccessError("User by " + id + "not customer!");
        }

        // Create cart by user id
        Cart newCart = new Cart();
        newCart.setUser(found.get());
        newCart.setTotalPrice(0.0);
        return cartRepository.save(newCart);
    }
    
}
