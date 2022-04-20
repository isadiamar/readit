package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.LoginDto;
import com.isabel.readit.api.dtos.TokenDto;
import com.isabel.readit.api.dtos.UserDto;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(AuthController.AUTH)
public class AuthController {
    static final String AUTH = "/api/auth";

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public TokenDto register(@RequestBody UserDto userDto) {
        User user = User.builder()
                .nickname(userDto.getNickname())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .confirmPassword(userDto.getConfirmPassword())
                .build();

        return authService.register(user);
    }

    @PostMapping("/login")
    public TokenDto login(@RequestBody LoginDto loginDto){
        return authService.login(loginDto);

    }
}
