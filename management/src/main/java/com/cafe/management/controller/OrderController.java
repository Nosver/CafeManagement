package com.cafe.management.controller;


import com.azure.core.annotation.Post;
import com.cafe.management.dto.OrderDTO;
import com.cafe.management.model.Cart;
import com.cafe.management.model.Order;
import com.cafe.management.model.Stock;
import com.cafe.management.response.PaymentResponse;
import com.cafe.management.service.OrderService;
import com.cafe.management.service.impl.PaymentService;
import com.nimbusds.openid.connect.sdk.assurance.Status;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.model.checkout.SessionCollection;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionListParams;
import io.swagger.v3.oas.annotations.Hidden;

import org.apache.coyote.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PropertySource("classpath:secret.properties")
public class OrderController {
    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @PostMapping("customer_only/order")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody Cart cart) throws StripeException {
        try {
            return ResponseEntity.ok(paymentService.createOrder(cart));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(400)).build();
        }


    }

    @PostMapping("/customer_only/isValidOrder")
    public boolean isValidOrder(@RequestBody Cart cart) {
        return orderService.isValidOrder(cart);
    }

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    private final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Hidden
    @PostMapping("/stripe/events")
    public void handleStripeEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {

        if (endpointSecret == null) {
            return;
        }

        Event event;

        try {
            event = Webhook.constructEvent(
                    payload, sigHeader, endpointSecret
            );
        } catch (SignatureVerificationException e) {
            logger.info("⚠️  Webhook error while validating signature.");
            return;
        }


        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        }
        // Handle the event
        if (event.getType().equals("checkout.session.completed")) {
            Session session = (Session) stripeObject;
            logger.info("Checkout session ID = {}", session.getId());


            orderService.processOrder(session.getId());
        }


    }

    @Value("${STRIPE_SECRET_KEY}")
    private String stripeApiKey;

    @Hidden
    @GetMapping("admin_only/transactions")
    public List<Session> getTransactions() throws StripeException {
        // Set the Stripe API key
        Stripe.apiKey = stripeApiKey;

        // Initialize parameters for listing transactions

        SessionListParams params = SessionListParams.builder().setLimit(5L).build();
        SessionCollection sessions = Session.list(params);

        // Retrieve a list of transactions from Stripe
        return sessions.getData();

    }

    @GetMapping("employee_and_admin/getOrdersForErp")
    public ResponseEntity<List<OrderDTO>> getOrdersForErp() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("customer_only/getOrdersForCustomer")
    public ResponseEntity<List<OrderDTO>> getOrdersForCustomer() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }


    @PostMapping("employee_and_admin/cancelOrder")
    public ResponseEntity<String> cancelOrder(@RequestBody Order order) {
        // NOT COMPLETED YET
        try {
            orderService.cancelOrder(order);
            return ResponseEntity.ok().body("Order has been cancelled.");
        } catch (BadRequestException bad) {
            return ResponseEntity.badRequest().body("Cannot cancel already fulfilled order.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Unable to cancel order");
        }
    }



    @PostMapping("employee_and_admin/updateOrderStatus")
    public ResponseEntity<Order> updateOrderStatusById(@RequestBody Order updatedOrder){
        try {
            orderService.updateOrderStatusById(updatedOrder.getId(), updatedOrder);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(updatedOrder);
    }

}
