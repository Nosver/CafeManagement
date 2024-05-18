package com.cafe.management.controller;

import com.cafe.management.model.Mail;
import com.cafe.management.model.User;
import com.cafe.management.service.MailSenderService;
import com.cafe.management.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("employee_and_admin")
public class MailController {


    @Autowired
    private MailSenderService   mailSenderService;


    @PostMapping("/sendMailToAllCustomers")
    public Mail sendTopluMail(@RequestBody Mail mail) throws MessagingException {
        mailSenderService.sendTopluMail(mail);
        return mail;
    }
}
