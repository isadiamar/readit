package com.isabel.readit.api.dtos;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RegisterDtoTest {

    @Test
    void testGetSetNickname() {
        RegisterDto registerDto = RegisterDto.builder().nickname("Maria").email("maria@email.com").password("maria123").confirmPassword("maria123").build();

        assertEquals("Maria", registerDto.getNickname());

        registerDto.setNickname("Frida");
        assertEquals("Frida", registerDto.getNickname());
    }

    @Test
    void testGetSetEmail() {
        RegisterDto registerDto = RegisterDto.builder().nickname("Maria").email("maria@email.com").password("maria123").confirmPassword("maria123").build();

        assertEquals("maria@email.com", registerDto.getEmail());

        registerDto.setEmail("juan@email.com");
        assertEquals("juan@email.com", registerDto.getEmail());
    }

    @Test
    void testGetSetPassword() {
        RegisterDto registerDto = RegisterDto.builder().nickname("Maria").email("maria@email.com").password("maria123").confirmPassword("maria123").build();

        assertEquals("maria123", registerDto.getPassword());

        registerDto.setPassword("NotSAME");
        assertEquals("NotSAME", registerDto.getPassword());
    }


}
