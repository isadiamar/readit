package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UserDtoTest {

    @Test
    void testGetSetNickname() {
        User user = User.builder().nickname("Maria").email("maria@email.com").password("maria123").build();
        UserDto userDto = new UserDto(user);

        assertEquals("Maria", userDto.getNickname());

        userDto.setNickname("Frida");
        assertEquals("Frida", userDto.getNickname());
    }

    @Test
    void testGetSetEmail() {
        User user = User.builder().nickname("Maria").email("maria@email.com").password("maria123").build();
        UserDto userDto = new UserDto(user);

        assertEquals("maria@email.com", userDto.getEmail());

        userDto.setEmail("juan@email.com");
        assertEquals("juan@email.com", userDto.getEmail());
    }


    @Test
    void testGetSetDescription() {
        User user = User.builder().nickname("Maria").email("maria@email.com").description("description").build();
        UserDto userDto = new UserDto(user);

        assertEquals("description", userDto.getDescription());

        userDto.setDescription("description updated");
        assertEquals("description updated", userDto.getDescription());
    }

    @Test
    void testConstructorNotArg(){
        UserDto user = new UserDto();
        user.setEmail("hola@email");
        assertEquals("hola@email", user.getEmail());
    }

    @Test
    void testConstructorAllArg(){
        UserDto user = new UserDto("12", "nickname", "email@email.com", "password", "description" );
        assertEquals("nickname", user.getNickname());
    }
}

