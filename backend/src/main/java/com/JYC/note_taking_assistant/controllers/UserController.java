package com.JYC.note_taking_assistant.controllers;

import com.JYC.note_taking_assistant.entities.User;
import com.JYC.note_taking_assistant.models.AuthRequest;
import com.JYC.note_taking_assistant.models.AuthResponse;
import com.JYC.note_taking_assistant.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private UserService userService;
    public UserController (UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public User register(@RequestBody AuthRequest req){
        return userService.register(req);

    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req){
        return userService.verify(req);
    }

}
