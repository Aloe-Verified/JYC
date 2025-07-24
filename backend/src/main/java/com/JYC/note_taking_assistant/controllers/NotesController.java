package com.JYC.note_taking_assistant.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NotesController {
    private final NoteService noteService;
    public NotesController(NoteService noteService){
        this.noteService = noteService;
    }
    @GetMapping
    public List<String> getNotes(@AuthenticationPrincipal UserDetails user){
        List<String> notes = noteService.findByUsername(user.getUsername());
        return notes;
    }
}
