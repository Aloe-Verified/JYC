package com.JYC.note_taking_assistant.models;

public class AuthRequest {
    private String username;
    private String password;
    //empty for Jackson - will figure out if this is actually how it works later
    public AuthRequest (){

    }
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
