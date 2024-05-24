package com.cafe.management.service;

import com.cafe.management.model.Cart;
import com.cafe.management.model.CartItem;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.ProductSize;
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
            throw new IllegalAccessError("User by " + id + " not customer!");
        }

        // Create cart by user id
        Cart newCart = new Cart();
        newCart.setUser(found.get());
        newCart.setTotalPrice(0.0);
        return cartRepository.save(newCart);
    }

    public Optional<Cart> getActiveCartByUserId(Long id) {
        return cartRepository.getActiveCartByUserId(id);
    }


    public Double calculateTotalPrice(Cart cart){
        Double totalPrice=0.0;


        for(CartItem cartItem: cart.getCartItems()){
            if(cartItem.getSize() == ProductSize.MEDIUM){
                totalPrice+= cartItem.getAmount() * cartItem.getProduct().getPrice();
            } else if (cartItem.getSize() == ProductSize.SMALL) {
                totalPrice+= cartItem.getAmount() * cartItem.getProduct().getPrice()*0.9;
            }
            else if (cartItem.getSize() == ProductSize.LARGE) {
                totalPrice+= cartItem.getAmount() * cartItem.getProduct().getPrice()*1.1;
            }

        }
       return totalPrice;

    }

    public Cart getCartById(Long id){
        Optional<Cart> c =cartRepository.findById(id);
        if(c.isEmpty()){
            return  null;
        }

        return c.get();
    }
}
