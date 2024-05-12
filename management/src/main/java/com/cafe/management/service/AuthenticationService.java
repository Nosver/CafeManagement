package com.cafe.management.service;

import com.cafe.management.model.AuthenticationResponse;
import com.cafe.management.model.Token;
import com.cafe.management.model.User;
import com.cafe.management.model.enums.Provider;
import com.cafe.management.model.enums.Role;
import com.cafe.management.repository.TokenRepository;
import com.cafe.management.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final TokenRepository tokenRepository;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 TokenRepository tokenRepository,
                                 AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(User request) {

        // check if user already exist. if exist than authenticate the user
        if(repository.findByEmail(request.getUsername()).isPresent()) {
            return new AuthenticationResponse(null, "User already exist",null);
        }
/*
* Set other fields
* */
        User user = new User();
        user.setFullName(request.getFullName());
        user.setProvider(Provider.LOCAL);
        user.setEmail(request.getEmail());


        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());

        user = repository.save(user);

        //String jwt = jwtService.generateToken(user);

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
        List<Token> validTokens = tokenRepository.findAllTokensByUser(user.getId());
        if(validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(t-> {
            t.setLoggedOut(true);
        });

        tokenRepository.saveAll(validTokens);
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
        user = repository.save(user);

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
}
