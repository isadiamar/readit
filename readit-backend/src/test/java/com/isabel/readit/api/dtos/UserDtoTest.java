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
    void testGetSetDescription() {
        User user = User.builder().nickname("Maria").email("maria@email.com").description("description").build();
        UserDto userDto = new UserDto(user);

        assertEquals("description", userDto.getDescription());

        userDto.setDescription("description updated");
        assertEquals("description updated", userDto.getDescription());
    }

}

