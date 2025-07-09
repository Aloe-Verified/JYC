package com.JYC.note_taking_assistant.controllers;

import com.JYC.note_taking_assistant.entities.User;
import com.JYC.note_taking_assistant.services.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    public UserController (UserService userService) {
        this.userService = userService;
    }
    @PostMapping()
    public User createUser(@RequestBody HashMap<String, String>userDetails){
        String username = userDetails.get("username");
        String password = userDetails.get("password");
        User created = userService.register(username, password);
        return created;
    }

}
