package com.cafe.management.service;

import com.cafe.management.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {

    @SuppressWarnings("unused")
    @Autowired
    private CartItemRepository cartItemRepository;


}
