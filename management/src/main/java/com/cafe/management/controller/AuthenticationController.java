package com.cafe.management.controller;

import com.cafe.management.model.AuthenticationResponse;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Role;
import com.cafe.management.service.AuthenticationService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;

    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/registerCustomer")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request) throws MessagingException {
        if(request.getRole()== Role.CUSTOMER){
            return ResponseEntity.ok(authService.register(request));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/admin_only/registerAdminAndEmployee")
    public ResponseEntity<AuthenticationResponse> registerAdminAndEmployee(
            @RequestBody User request) throws MessagingException {
            return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/registerFirstAdmin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody User adminReq) throws MessagingException {
        // If there is no admin in this state, this method allows anyone to create admin account
        try {
            return ResponseEntity.ok(authService.registerFirstAdmin(adminReq));
        }catch (Exception e){
            return ResponseEntity.badRequest().build();

        }

    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request) {
        try {
            return ResponseEntity.ok(authService.authenticate(request));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthenticationResponse(null, "Authentication error", null));
        }
    }

    @PostMapping("/googleRegister")
    public ResponseEntity<AuthenticationResponse> googleRegister(@RequestBody User request) {
        AuthenticationResponse response = authService.registerWithGoogle(request);
        if (response.getMessage().equals("User already exist")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/googleLogin")
    public ResponseEntity<AuthenticationResponse> googleLogin(@RequestBody User request) {

        AuthenticationResponse response = authService.loginWithGoogle(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verifyEmail")
    public ResponseEntity<Boolean> verifyEmail(@RequestParam String token) {
        boolean res = authService.verifyEmail(token);
        if (res)
            return ResponseEntity.ok(true);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);

    }
}
