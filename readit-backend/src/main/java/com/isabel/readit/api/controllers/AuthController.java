package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.LoginDto;
import com.isabel.readit.api.dtos.RegisterDto;
import com.isabel.readit.api.dtos.TokenDto;
import com.isabel.readit.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(AuthController.AUTH)
public class AuthController {
    static final String AUTH = "/api/auth";

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public TokenDto register(@RequestBody RegisterDto registerDto) {
        return authService.register(registerDto);
    }

    @PostMapping("/login")
    public TokenDto login(@RequestBody LoginDto loginDto) {
        return authService.login(loginDto);

    }
}
