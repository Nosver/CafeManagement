package com.cafe.management.controller;


import com.cafe.management.model.Order;
import com.cafe.management.response.PaymentResponse;
import com.cafe.management.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.model.checkout.SessionCollection;
import com.stripe.net.Webhook;
import com.stripe.param.PayoutListParams;
import com.stripe.param.checkout.SessionListParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@PropertySource("classpath:secret.properties")
public class OrderController {
    @Autowired
    private PaymentService paymentService;
    @PostMapping("/order")
    public PaymentResponse createOrder(@RequestBody Order order) throws StripeException {
        return paymentService.createPaymentLink(order);

    }

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    private final Logger logger= LoggerFactory.getLogger(OrderController.class);
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
                // Deserialization failed, probably due to an API version mismatch.
                // Refer to the Javadoc documentation on `EventDataObjectDeserializer` for
                // instructions on how to handle this case, or return an error here.
            }
            // Handle the event
            switch (event.getType()) {
                case "checkout.session.completed":
                    Session session = (Session) stripeObject;
                    logger.info("Checkout session ID = {}", session.getId());


                    break;

                /*case "payment_intent.succeeded":
                    PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
                    logger.info("Payment for {} succeeded.",paymentIntent.getAmount() );
                    //handleSuccessfullPayment();
                    // Then define and call a method to handle the successful payment intent.
                    // handlePaymentIntentSucceeded(paymentIntent);
                    break;
*/

                /*default:
                    logger.warn("Unhandled event type: {}",  event.getType());
                    break;*/
            }
            return "";


    }

    @Value("${STRIPE_SECRET_KEY}")
    private String stripeApiKey;

    @GetMapping("/transactions")
    public List<Session> getTransactions() throws StripeException {
        // Set the Stripe API key
        Stripe.apiKey = stripeApiKey;

        // Initialize parameters for listing transactions (e.g., limit)

        SessionListParams params = SessionListParams.builder().setLimit(8L).build();
        SessionCollection sessions = Session.list(params);

        // Retrieve a list of transactions from Stripe
        return sessions.getData();

    }
}
