package com.cafe.management.service;

import com.cafe.management.dto.OrderDTO;
import com.cafe.management.model.*;
import com.cafe.management.model.enums.Status;
import com.cafe.management.repository.OrderRepository;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.BadRequest;

import java.util.*;

@Service
public class OrderService {

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private StockService stockService;

    @Autowired
    private ProductService productService;

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

        //Decrease stock
        for(CartItem c: cart.get().getCartItems()){
           for(RequiredStock req: c.getProduct().getRequiredStocks()){
            req.getStock().setQuantity(req.getStock().getQuantity() - (req.getAmount() * c.getAmount()) );
            stockService.updateStockById(req.getStock().getId(),req.getStock());
           }
        }

        //update predicted stocks
        productService.recalculatePredictedStocks();

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

    public List<OrderDTO> getAllOrders(){
        List<Order> orders= orderRepository.findAll();

        List<OrderDTO> dtos = new ArrayList<OrderDTO>();
        for (Order order: orders){
            OrderDTO dto= new OrderDTO(order.getId(),order.getTotalPrice(),order.getCart().getCartItems(),order.getStatus(),order.getCreatedAt(),order.getUser().getFullName());
            dtos.add(dto);
        }
        return dtos;
    }

/*
    public void cancelOrder(Order order) throws BadRequestException {
        
        Order found = orderRepository.getReferenceById(order.getId());

        if(found.getStatus() == Status.SERVED){
            throw new BadRequestException("Cannot cancel already fulfilled order");
        }

        if (found.getStatus() == Status.CANCELLED) {
            throw new BadRequestException("Cannot cancel already cancelled order");
        }

        found.setStatus(Status.CANCELLED);
        orderRepository.save(found);

        // Take the stock back
        throw new UnsupportedOperationException("Method not completed");
    }
*/

    @Transactional
    public void cancelOrderByIdCustomer(Long orderId){
        Optional<Order> existingOrder = orderRepository.findById(orderId);

        if(existingOrder.isEmpty()){
            return ;
        }

        existingOrder.get().setStatus(Status.CANCELLED);

        Cart cart = existingOrder.get().getCart();

        //Increase stock
        for(CartItem c: cart.getCartItems()){
            for(RequiredStock req: c.getProduct().getRequiredStocks()){
                req.getStock().setQuantity(req.getStock().getQuantity() + (req.getAmount() * c.getAmount()) );
                stockService.updateStockById(req.getStock().getId(),req.getStock());
            }
        }
        productService.recalculatePredictedStocks();

        orderRepository.save(existingOrder.get());
    }

    @Transactional
    public void updateOrderStatusById(Long orderId, Order updatedOrder) {

        Order existingOrder = orderRepository.findById(orderId).orElseThrow();

        if (existingOrder != null) {
            existingOrder.setId(updatedOrder.getId());
            existingOrder.setStatus(updatedOrder.getStatus());
            orderRepository.save(existingOrder);
        }else {
            throw new IllegalArgumentException("Order with id " + orderId + " not found.");
        }
    }

}
