package com.cafe.management.controller;

import com.cafe.management.response.ImageResponse;
import com.cafe.management.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/public")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<ImageResponse> uploadImageWithCaption(@RequestParam("image") MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok(new ImageResponse(imageService.uploadImageWithCaption(imageFile)));
    }


}
