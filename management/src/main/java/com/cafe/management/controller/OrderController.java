package com.cafe.management.controller;


import com.cafe.management.dto.OrderDTO;
import com.cafe.management.model.Cart;
import com.cafe.management.model.Order;
import com.cafe.management.response.PaymentResponse;
import com.cafe.management.service.OrderService;
import com.cafe.management.service.impl.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.model.checkout.SessionCollection;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionListParams;
import io.swagger.v3.oas.annotations.Hidden;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
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
       try{
           return ResponseEntity.ok(paymentService.createOrder(cart));
       }catch (Exception e){
           return ResponseEntity.status(HttpStatusCode.valueOf(400)).build();
       }


    }

    @PostMapping("/customer_only/isValidOrder")
    public boolean isValidOrder(@RequestBody Cart cart){
     return  orderService.isValidOrder(cart);
    }

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    private final Logger logger= LoggerFactory.getLogger(OrderController.class);
    @Hidden
    @PostMapping("/stripe/events")
    public String handleStripeEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader){


            if(endpointSecret== null)
                return "";

                Event event;
                // Only verify the event if you have an endpoint secret defined.
                // Otherwise use the basic event deserialized with GSON.
                try {
                    event = Webhook.constructEvent(
                            payload, sigHeader, endpointSecret
                    );
                } catch (SignatureVerificationException e) {
                    // Invalid signature
                    logger.info("⚠️  Webhook error while validating signature.");
                    return "";
                }





        // Deserialize the nested object inside the event
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            StripeObject stripeObject = null;
            if (dataObjectDeserializer.getObject().isPresent()) {
                stripeObject = dataObjectDeserializer.getObject().get();
            } else {

            }
            // Handle the event
            switch (event.getType()) {
                case "checkout.session.completed":
                    Session session = (Session) stripeObject;
                    logger.info("Checkout session ID = {}", session.getId());


                    orderService.processOrder(session.getId());

                    break;
            }
            return "";


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
    public ResponseEntity<List<OrderDTO>> getOrdersForErp(){
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
