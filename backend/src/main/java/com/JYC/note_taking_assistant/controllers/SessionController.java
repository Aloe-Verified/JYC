package com.JYC.note_taking_assistant.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionController {
    // SecurityConfig requires authentication for this route.
    @GetMapping("/api/session")
    public ResponseEntity<Void> session() {
        return ResponseEntity.noContent().header("Cache-Control", "no-store").build();
    }
}
