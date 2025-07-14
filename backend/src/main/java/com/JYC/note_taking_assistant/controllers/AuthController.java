//package com.JYC.note_taking_assistant.controllers;
//
//import com.JYC.note_taking_assistant.models.AuthRequest;
//import com.JYC.note_taking_assistant.models.AuthResponse;
//import com.JYC.note_taking_assistant.services.JwtService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    private final JwtService jwtService;
//    private final AuthenticationManager authenticationManager;
//
//    public AuthController(JwtService jwtService, AuthenticationManager authenticationManager){
//        this.jwtService = jwtService;
//        this.authenticationManager = authenticationManager;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req){
//        //might encapsulate this logic into an AuthService if necessary
//        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
//        String token = jwtService.generateToken(auth.getName());
//        long expires = jwtService.extractExpiration(token).getTime() - System.currentTimeMillis();
//        AuthResponse res = new AuthResponse(token, expires/1000);
//        return ResponseEntity.ok(res);
//    }
//}
