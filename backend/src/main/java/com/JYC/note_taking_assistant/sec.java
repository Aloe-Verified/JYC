//package com.JYC.note_taking_assistant;
//
//import java.util.List;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
//import org.springframework.web.cors.CorsConfiguration;
//
//@Configuration
//public class sec {
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//        http
//                .csrf(csrf-> csrf.disable())
//                .cors(cors -> cors.configurationSource(request -> {
//                    CorsConfiguration cfg = new CorsConfiguration();
//                    cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//                    cfg.setAllowedHeaders(List.of("*"));
//                    cfg.setAllowedOrigins(List.of("http://localhost:3000"));
//                    cfg.setAllowCredentials(true);
//                    return cfg;
//                }))
//                .authorizeHttpRequests((requests) -> requests
//                        .requestMatchers("/", "/home").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .formLogin((form) -> form
//                        .loginPage("/login")
//                        .permitAll()
//                )
//                .logout((logout) -> logout.permitAll());
//        return http.build();
//    }
//}
