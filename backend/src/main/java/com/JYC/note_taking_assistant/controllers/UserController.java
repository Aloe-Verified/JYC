package com.JYC.note_taking_assistant.controllers;

import com.JYC.note_taking_assistant.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.JYC.note_taking_assistant.entities.User;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository repo;
    @GetMapping
    public Optional<User> hello() {
        return repo.findByUsername("aidan");
    }
    @PostMapping("/echo")
    public Map<String, Object> fakeCreate (@RequestBody Map<String, Object> p)  {
        p.put("id",123);
        return p;
    }
}
