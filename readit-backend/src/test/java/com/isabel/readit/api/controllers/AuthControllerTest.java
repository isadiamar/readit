package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.LoginDto;
import com.isabel.readit.api.dtos.TokenDto;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.AuthService;
import com.isabel.readit.services.exceptions.ForbiddenException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AuthControllerTest {

    @Autowired
    private AuthService authService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;


    @BeforeAll
    void beforeAll() {
        User user1 = new User();
        user1.setEmail("user1@test.com");
        user1.setPassword(passwordEncoder.encode("Password"));
        userRepository.save(user1);
    }

    @Test
    void testLoginOk() {
        LoginDto loginDto = new LoginDto();
        loginDto.setEmail("user1@test.com");
        loginDto.setPassword("Password");
        TokenDto tokenDto =  this.authService.login(loginDto);
        assertNotNull(tokenDto);
    }

    @Test
    void testLoginBadEmail() {
        LoginDto loginDto = new LoginDto();
        loginDto.setEmail("user100@test.com");
        loginDto.setPassword("Password");
        ForbiddenException thrown = assertThrows(
                ForbiddenException.class,
                () -> this.authService.login(loginDto),
                "Expected authService.login() to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("Forbidden Exception: Email or password are wrong"));
    }
}
