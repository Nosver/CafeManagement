package com.cafe.management.service;

import com.cafe.management.model.Order;
import com.cafe.management.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
