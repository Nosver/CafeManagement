package com.cafe.management.controller;

import com.cafe.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @SuppressWarnings("unused")
    @Autowired
    private UserService userService;

}
