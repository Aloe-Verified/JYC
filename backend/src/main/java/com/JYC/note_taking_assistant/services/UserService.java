package com.JYC.note_taking_assistant.services;

import com.JYC.note_taking_assistant.entities.User;
import com.JYC.note_taking_assistant.models.AuthRequest;
import com.JYC.note_taking_assistant.models.AuthResponse;
import com.JYC.note_taking_assistant.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    @Autowired
    public UserService (UserRepository repo, PasswordEncoder encoder, AuthenticationManager authenticationManager, JwtService jwtService){
        this.repo = repo;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }
    public User register(AuthRequest req){
        String username = req.getUsername();
        String rawPassword = req.getPassword();
        if (repo.findByUsername(username).isPresent()){
            throw new IllegalArgumentException("Username is already present in the database");
        }

        String hashedPassword = encoder.encode(rawPassword);
        User CreatedUser = new User(username, hashedPassword);
        repo.save(CreatedUser);
        return CreatedUser;

    }

    public ResponseEntity<AuthResponse> verify(AuthRequest req) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        String token = jwtService.generateToken(auth.getName());
        long expires = jwtService.extractExpiration(token).getTime() - System.currentTimeMillis();
        AuthResponse res = new AuthResponse(token, expires/1000);
        return ResponseEntity.ok(res);
    }
}
