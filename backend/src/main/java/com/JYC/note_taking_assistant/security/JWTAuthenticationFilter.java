package com.JYC.note_taking_assistant.security;

import com.JYC.note_taking_assistant.models.CustomUserDetails;
import com.JYC.note_taking_assistant.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

public class JWTAuthenticationFilter extends OncePerRequestFilter {
    private JwtService tokenGenerator;
    private CustomUserDetails userDetails;

    @Autowired
    public JWTAuthenticationFilter(JwtService tokenGenerator, CustomUserDetails userDetails){
        this.tokenGenerator = tokenGenerator;
        this.userDetails = userDetails;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Optional<String> tokenOpt = getJWTFromRequest(request);
        if (tokenOpt.isPresent()) {
            String token = tokenOpt.get();
            if (StringUtils.hasText(token) && tokenGenerator.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
    private Optional<String> getJWTFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            return Optional.of(token);
        }
        return Optional.empty();
    }
}
