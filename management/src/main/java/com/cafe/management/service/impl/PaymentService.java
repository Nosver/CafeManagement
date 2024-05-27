package com.cafe.management.service.impl;

import com.cafe.management.model.Cart;
import com.cafe.management.model.Order;
import com.cafe.management.response.PaymentResponse;
import com.cafe.management.service.CartService;
import com.cafe.management.service.OrderService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;


@Service
@PropertySource("classpath:secret.properties")
public class PaymentService{


    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;


    public PaymentResponse createPaymentLink(Cart cart2) throws StripeException {

        Cart cart = cartService.getCartById(cart2.getId());

        if (cart == null || cart.getTotalPrice() == null) {
            // Handle the case where order or totalPrice is null
            // For example, you can throw an exception or return an error response
            throw new IllegalArgumentException("Order or total price is null");
        }

        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder().
                addPaymentMethodType(
                        SessionCreateParams.PaymentMethodType.CARD
                ).setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/success/" + cart.getId())
                .setCancelUrl("http://localhost:3000/fail/" + cart.getId())
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("try")
                                .setUnitAmount(
                                        (long) cart.getTotalPrice().longValue()*100


                                )
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Coffee").build()).build()
                        )

                        .build()

                )

                .build();

        Session session= Session.create(params);



        PaymentResponse paymentResponse = new PaymentResponse();
        System.out.println("Session id= "+ session.getId());

        cart.setSessionID(session.getId());
        cartService.addCart(cart);

        paymentResponse.setPayment_url(session.getUrl());
        return paymentResponse;
    }

    public PaymentResponse createOrder(Cart cart) throws StripeException {
        if(orderService.isValidOrder(cart)){
            return createPaymentLink(cart);
        }
        else{
            throw new IllegalArgumentException("Order is not valid check the stocks");
        }
    }
}
