package com.cafe.management.service.impl;

import com.cafe.management.model.Order;
import com.cafe.management.response.PaymentResponse;
import com.cafe.management.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.Review;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Service
@PropertySource("classpath:secret.properties")
public class PaymentServiceImpl implements PaymentService {


    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    @Override
    public PaymentResponse createPaymentLink(Order order) throws StripeException {


        if (order == null || order.getTotalPrice() == null) {
            // Handle the case where order or totalPrice is null
            // For example, you can throw an exception or return an error response
            throw new IllegalArgumentException("Order or total price is null");
        }

        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder().
                addPaymentMethodType(
                        SessionCreateParams.PaymentMethodType.CARD
                ).setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/success/" + order.getId())
                .setCancelUrl("http://localhost:3000/fail/" + order.getId())
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("try")
                                .setUnitAmount(
                                        (long) order.getTotalPrice().longValue()*100


                                )
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Coffee").build()).build()
                        )

                        .build()

                )

                .build();

        Session session= Session.create(params);



        PaymentResponse paymentResponse = new PaymentResponse();

        paymentResponse.setPayment_url(session.getUrl());
        return paymentResponse;
    }


}
