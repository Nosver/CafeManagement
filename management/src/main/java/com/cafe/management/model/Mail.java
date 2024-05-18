package com.cafe.management.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Mail {
    private String reciverEmail;
    private String subject;
    private String body;
}
