package com.JYC.note_taking_assistant.models;

public class AuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private long expiresIn;

    public AuthResponse() {}
    public AuthResponse(String token, long expiresIn) {
        this.token      = token;
        this.expiresIn  = expiresIn;
    }

    public String getToken() { return token; }
    public void setToken(String t) { this.token = t; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tt) { this.tokenType = tt; }

    public long getExpiresIn() { return expiresIn; }
    public void setExpiresIn(long e) { this.expiresIn = e; }
}
