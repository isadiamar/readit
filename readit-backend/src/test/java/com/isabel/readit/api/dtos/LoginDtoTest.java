package com.isabel.readit.api.dtos;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginDtoTest {

    @Test
    void testGetSetEmail() {
        LoginDto login = LoginDto.builder().email("test@test.com").password("PasWord12!").build();

        assertEquals("test@test.com", login.getEmail());

        login.setEmail("noTest@test.com");
        assertEquals("noTest@test.com", login.getEmail());
    }

    @Test
    void testGetSetPassword() {
        LoginDto login = LoginDto.builder().email("test@test.com").password("PasWord12!").build();
        assertEquals("PasWord12!", login.getPassword());
        login.setPassword("NoPasWord12!");
        assertEquals("NoPasWord12!", login.getPassword());
    }
}
