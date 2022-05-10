package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RegisterDtoTest {

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

    @Test
    void testConstructor(){
        RegisterDto registerDtoNoParameters = new RegisterDto();
        String res = "RegisterDto(nickname=null, email=null, password=null, confirmPassword=null)";
        assertEquals(res,registerDtoNoParameters.toString());

        RegisterDto registerDtoParameters = new RegisterDto("nickname", "email@email", "password", "password");
        String resPar = "RegisterDto(nickname=nickname, email=email@email, password=password, confirmPassword=password)";

        assertEquals(resPar,registerDtoParameters.toString());
    }

    @Test
    void testCopyProperties(){
        User user = User.builder().nickname("nick").email("email").description("description").build();
        RegisterDto register = new RegisterDto(user);
        assertEquals("nick", register.getNickname());
        assertEquals("email", register.getEmail());
    }


}
