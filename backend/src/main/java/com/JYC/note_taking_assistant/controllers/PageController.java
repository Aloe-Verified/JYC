package com.JYC.note_taking_assistant.controllers;

import com.JYC.note_taking_assistant.entities.Page;
import com.JYC.note_taking_assistant.models.PageCreateDTO;
import com.JYC.note_taking_assistant.services.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/pages")
public class PageController {
    private final PageService pageService;
    @Autowired
    public PageController(PageService pageService){
        this.pageService = pageService;
    }
    @PostMapping()
    public Page CreatePage(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PageCreateDTO data){
        return pageService.createPage(userDetails.getUsername(), data);
    }
    @GetMapping("/{id}")
    public Page getPageById(@PathVariable Long id){
        return pageService.getPageById(id);
    }
}
