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

}

