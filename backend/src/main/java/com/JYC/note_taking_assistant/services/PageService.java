package com.JYC.note_taking_assistant.services;

import com.JYC.note_taking_assistant.entities.Page;
import com.JYC.note_taking_assistant.entities.User;
import com.JYC.note_taking_assistant.models.PageCreateDTO;
import com.JYC.note_taking_assistant.repos.PageRepository;
import com.JYC.note_taking_assistant.repos.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class PageService {
    UserRepository users;
    PageRepository pages;
    public PageService (UserRepository users, PageRepository pages) {
        this.users = users;
        this.pages = pages;
    }
    public Page createPage(String username, PageCreateDTO data){
        Page p = new Page();
        Optional<User> u = users.findByUsername(username);
        p.setUser(u.orElse(null));
        p.setTitle(data.getTitle());
        p.setPosition(data.getPosition());
        p.setCreatedAt(Instant.now());
        if (data.getParentId() != null) {
            Page parent = pages.findById(data.getParentId())
                    .orElseThrow(() -> new EntityNotFoundException("Parent page not found"));
            p.setParent(parent);
        }
        pages.save(p);
        return p;
    }
    public Page getPageById(Long id){
        return pages.findById(id).orElseThrow(() -> new EntityNotFoundException("Page not found"));
    }
}
