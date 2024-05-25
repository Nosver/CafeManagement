package com.cafe.management.service;

import com.cafe.management.model.AuthenticationResponse;
import com.cafe.management.model.Cart;
import com.cafe.management.model.Mail;
import com.cafe.management.model.Token;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Provider;
import com.cafe.management.model.enums.Role;
import com.cafe.management.repository.TokenRepository;
import com.cafe.management.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.naming.AuthenticationException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

// ecustomer@gmail.com1231231
// 5gsn7P)sBn
@Service
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CartService cartService;
    private final TokenRepository tokenRepository;

    private final AuthenticationManager authenticationManager;

    private final MailSenderService mailSenderService;
    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 TokenRepository tokenRepository,
                                 AuthenticationManager authenticationManager,
                                 MailSenderService mailSenderService,
                                 CartService cartService
                                 ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
        this.mailSenderService=mailSenderService;
        this.cartService = cartService;
    }

    public AuthenticationResponse register(User request) throws MessagingException {

        // check if user already exist. if exist than authenticate the user
        if(repository.findByEmail(request.getUsername()).isPresent()) {
            return new AuthenticationResponse(null, "User already exist",null);
        }
/*
* Set other fields
* */

        // Set user details for all roles
        User user = new User();
        user.setFullName(request.getFullName());
        user.setProvider(Provider.LOCAL);
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setSalary(request.getSalary());
        user.setPosition(request.getPosition());
    

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());
        user.setAvatar("https://publiccafein.blob.core.windows.net/publiccafein/avatar-default-svgrepo-com.svg");
        if(user.getRole().equals(Role.CUSTOMER)){
            user.setEmailVerificationLink(UUID.randomUUID().toString());
            user.setIsAccountEnabled(false);
        }
        else
            user.setIsAccountEnabled(true);
        user = repository.save(user);

        //String jwt = jwtService.generateToken(user);        
        
        String subject = "Verify Your Email for Cafe-In Registration";
        String body = "<html>" +
                "<body style='font-family: Arial, sans-serif;'>" +
                "<h2>Hi " + user.getFullName() + ",</h2>" +
                "<p>We just need to verify your email address before you register for Cafe-In.</p>" +
                "<p><strong>Verify your email address:</strong> <a href='http://localhost:3000/verify-email?token="+user.getEmailVerificationLink()+"'>Click here</a></p>" +
                "<p>Thanks!<br/>– Cafe-in Technology</p>" +
                "</body>" +
                "</html>";
        if(user.getRole().equals(Role.CUSTOMER)){
            cartService.createCartById(user.getId());
            mailSenderService.sendNewMail(new Mail(user.getEmail(), subject, body));
        }
    
        //saveUserToken(jwt, user);

        return new AuthenticationResponse(null, "User registration was successful",user.getRole().toString());

    }

    public AuthenticationResponse authenticate(User request) throws AuthenticationException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = repository.findByEmail(request.getUsername()).orElseThrow();
        if(user.getProvider().equals(Provider.GOOGLE)) {
            throw new AuthenticationException("Provider error");
        }
        String jwt = jwtService.generateToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(jwt, user);

        return new AuthenticationResponse(jwt, "User login was successful",user.getRole().toString());

    }
    
    private void revokeAllTokenByUser(User user) {


        tokenRepository.deleteUserTokens(user.getId());



    }
    
    private void saveUserToken(String jwt, User user ) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    public AuthenticationResponse registerWithGoogle(User request) {
        if(repository.findByEmail(request.getUsername()).isPresent()) {
            return new AuthenticationResponse(null, "User already exist",null);
        }
        User user = new User();
        user.setFullName(request.getFullName());
        user.setProvider(Provider.GOOGLE);
        user.setEmail(request.getEmail());
        String dummyPass="111111";
        user.setPassword(passwordEncoder.encode(dummyPass));
        user.setRole(Role.CUSTOMER);
        user.setAvatar(request.getAvatar());
        user.setLastLogin(Timestamp.from(Instant.now()));
        user.setIsAccountEnabled(true);
        user = repository.save(user);

        // Create empty cart for given customer id
        cartService.createCartById(user.getId());

        return new AuthenticationResponse(null, "User registration was successful",user.getRole().toString());

    }

    public AuthenticationResponse loginWithGoogle(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),"111111"
                )
        );

        User user = repository.findByEmail(request.getUsername()).orElseThrow();
        String jwt = jwtService.generateToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(jwt, user);

        return new AuthenticationResponse(jwt, "User login was successful",user.getRole().toString());
    }
    public boolean verifyEmail(String verificationCode){
        Optional<User> user =repository.findByEmailVerificationLink(verificationCode);
        if(user.isPresent()){
            user.get().setIsAccountEnabled(true);
            user.get().setEmailVerificationLink(null);
            repository.save(user.get());
            return true;
        }
        return false;
    }
}
