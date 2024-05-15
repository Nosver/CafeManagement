package com.cafe.management.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendNewMail(String to, String subject, String body) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true); // true indicates multipart message

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true); // true indicates HTML content

        mailSender.send(message);
    }
}
