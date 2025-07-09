package com.JYC.note_taking_assistant.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class AppConfig {

    @Bean
    public PasswordEncoder PasswordEncoder(){
//        return new BCryptPasswordEncoder();
        Map<String,PasswordEncoder>encoderMap = new HashMap<>();
        encoderMap.put("bcrypt", new BCryptPasswordEncoder());
        return new DelegatingPasswordEncoder("bcrypt", encoderMap);
    }
}
