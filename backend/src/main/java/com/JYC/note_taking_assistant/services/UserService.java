package com.JYC.note_taking_assistant.services;

import com.JYC.note_taking_assistant.entities.User;
import com.JYC.note_taking_assistant.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    @Autowired
    public UserService (UserRepository repo, PasswordEncoder encoder){
        this.repo = repo;
        this.encoder = encoder;
    }
    public User register(String username, String rawPassword){
        if (repo.findByUsername(username).isPresent()){
            throw new IllegalArgumentException("Username is already present in the database");
        }

        String hashedPassword = encoder.encode(rawPassword);
        User CreatedUser = new User(username, hashedPassword);
        repo.save(CreatedUser);
        return CreatedUser;

    }
}
