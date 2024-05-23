package com.cafe.management.service;

import com.cafe.management.model.Cart;
import com.cafe.management.model.CartItem;
import com.cafe.management.model.Product;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;
import com.cafe.management.repository.CartItemRepository;

import java.util.Optional;

import javax.management.RuntimeErrorException;
import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {

    @SuppressWarnings("unused")
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    public CartItem addCartItem(CartItem cartItem) {

        System.out.println("");
        System.out.println("");
        System.out.println("");
        System.out.println(cartItem);
        System.out.println("");
        System.out.println("");
        System.out.println("");
        
        
        // Find user
        Optional<User> user = userService.findById(cartItem.getCart().getUser().getId());

        if(!user.isPresent()){
            throw new RuntimeErrorException(null, "User not found!");
        }

        if(user.get().getRole() != Role.CUSTOMER){
            throw new RuntimeErrorException(null, "User is not customer!");
        }

        // Find cart corresponding to user id
        Optional<Cart> activeCart = cartService.getActiveCartByUserId(user.get().getId());
        
        if(!activeCart.isPresent()){
            throw new RuntimeErrorException(null, "Cart is not found!");
        }

        if(cartItem.getProduct() == null){
            throw new RuntimeErrorException(null, "Request does not contain product");
        }

        if(productService.getProductById(cartItem.getProduct().getId()) == null){
            throw new RuntimeErrorException(null, "Corresponding product not found!");
        }
        
        // Set the new cart item        
        CartItem newCartItem = new CartItem();
        newCartItem.setAmount(cartItem.getAmount());
        newCartItem.setCart(activeCart.get());
        newCartItem.setProduct(productService.getProductById(cartItem.getProduct().getId()));
        newCartItem.setSize(cartItem.getSize());
        
        return cartItemRepository.save(newCartItem);
    }


    


}
