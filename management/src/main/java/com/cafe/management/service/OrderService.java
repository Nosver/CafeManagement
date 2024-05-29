package com.cafe.management.service;

import com.cafe.management.model.Cart;
import com.cafe.management.model.CartItem;
import com.cafe.management.model.Order;
import com.cafe.management.model.Product;
import com.cafe.management.model.enums.Status;
import com.cafe.management.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderRepository orderRepository;

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
    public void processOrder(String sessionId ){
        /*
         * Get cart by session id
         * get the user from the cart
         *
         * create new order from the old active cart
         * set order state
         *
         * create new cart for user
         * */

        Optional<Cart> cart=cartService.findCartBySessionId(sessionId);
        if(cart.isEmpty()){
            throw new IllegalArgumentException("Cart is not found");
        }


        Order order= new Order();
        order.setUser(cart.get().getUser());
        order.setCart(cart.get());
        order.setTotalPrice(cart.get().getTotalPrice());
        order.setStatus(Status.ORDER_RECEIVED);
        Order savedOrder =orderRepository.save(order);


        cart.get().setOrder(savedOrder);
        cartService.addCart(cart.get());



        Cart cart1 = new Cart();
        cart1.setTotalPrice(0.0);
        cart1.setUser(cart.get().getUser());
        cartService.addCart(cart1);

    }
}
