package com.isabel.readit.services;

import com.isabel.readit.api.dtos.LoginDto;
import com.isabel.readit.api.dtos.RegisterDto;
import com.isabel.readit.api.dtos.TokenDto;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.exceptions.BadRequestException;
import com.isabel.readit.services.exceptions.ForbiddenException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AuthServiceTest {

    private AuthService authService;
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    @Autowired
    private AuthServiceTest(AuthService authService, PasswordEncoder passwordEncoder, UserRepository userRepository){
        this.authService = authService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }


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
        LoginDto loginDto = LoginDto.builder().email("user100@test.com").password("Password").build();
        BadRequestException thrown = assertThrows(
                BadRequestException.class,
                () -> this.authService.login(loginDto),
                "Expected authService.login() to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("Bad Request Exception: Email or password are wrong"));
    }

    @Test
    void testRegisterOk(){
        RegisterDto registerDto = RegisterDto.builder().nickname("c1").email("c1@email.com").password("c123h2").confirmPassword("c123h2").build();

        TokenDto tokenDto = this.authService.register(registerDto);
        assertNotNull(tokenDto);
    }

    @Test
    void testRegisterEmailInUse(){
        RegisterDto registerDto = RegisterDto.builder().nickname("exception").email("user1@test.com").password("c123h2").confirmPassword("c123h2").build();

        BadRequestException thrown = assertThrows(
                BadRequestException.class,
                () -> this.authService.register(registerDto),
                "Expected authService.register() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("Invalid data input"));

    }

    @Test
    void testRegisterConfirmedPasswordIncorrect(){
        RegisterDto registerDto = RegisterDto.builder().nickname("c2").email("c2@email.com").password("goodPassword!").confirmPassword("badPasss").build();
        BadRequestException thrown = assertThrows(
                BadRequestException.class,
                () -> this.authService.register(registerDto),
                "Expected authService.register() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("Invalid data input"));
    }
}
