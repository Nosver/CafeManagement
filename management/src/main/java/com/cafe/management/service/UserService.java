package com.cafe.management.service;

import com.cafe.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @SuppressWarnings("unused")
    @Autowired
    private UserRepository userRepository;

}
