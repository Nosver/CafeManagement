package com.cafe.management.service;

import com.cafe.management.model.Mail;
import com.cafe.management.model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    public Mail sendNewMail(Mail mail) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true); // true indicates multipart message

        helper.setTo(mail.getReciverEmail());
        helper.setSubject(mail.getSubject());
        helper.setText(mail.getBody(), true); // true indicates HTML content

        mailSender.send(message);
        return mail;
    }

    public void sendTopluMail(Mail mail) throws MessagingException {

        List<User> customers = userService.getAllCustomers();


        for (User c:customers){
            mail.setReciverEmail(c.getEmail());
            sendNewMail(mail);
        }
    }
}
