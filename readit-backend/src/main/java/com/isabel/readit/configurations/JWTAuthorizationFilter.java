package com.isabel.readit.configurations;

import com.isabel.readit.services.security.JWTService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

    private final String HEADER = "Authorization";
    private final String PREFIX = "Bearer ";

    private JWTService jwtService;

    public void setJwtService(JWTService jwtService) {
        this.jwtService = jwtService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = getJWTTokenFromRequest(request);
         if (!token.isEmpty() && jwtService.jwtVerifyToken(token)){
             String email = jwtService.getEmailFromToken(token);
             setUpAuthentication(email);
         }else{
             SecurityContextHolder.clearContext();
         }
         filterChain.doFilter(request,response);
    }

    private void setUpAuthentication(String email) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, null,
                Stream.of("user").map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    private String getJWTTokenFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader(HEADER);
        if (authHeader == null || !authHeader.startsWith(PREFIX)){
            return "";
        }
        return request.getHeader(HEADER).replace(PREFIX, "").trim();
    }
}
