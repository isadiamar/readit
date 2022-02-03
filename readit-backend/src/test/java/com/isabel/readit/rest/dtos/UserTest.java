package com.isabel.readit.rest.dtos;

import com.isabel.readit.data.UserEntity;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UserTest {

    @Test
    void testGetSetId() {
        User user = new User("Maria", "maria@email.com", "maria123");

        user.setId("10");
        assertEquals("10", user.getId());
    }

    @Test
    void testGetSetNickname() {
        User user = new User( "Pedro", "pedro@email.com", "pedro123");

        assertEquals("Pedro", user.getNickname());

        user.setNickname("Frida");
        assertEquals("Frida", user.getNickname());
    }

    @Test
    void testGetSetEmail() {
        User user = new User( "Alvaro", "alvaro@email.com", "alvaro123");

        assertEquals("alvaro@email.com", user.getEmail());

        user.setEmail("juan@email.com");
        assertEquals("juan@email.com", user.getEmail());
    }

    @Test
    void testGetSetPassword() {
        UserEntity userEntity = new UserEntity( "Alvaro", "alvaro@email.com", "alvaro123");
        User user = new User(userEntity);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        boolean match = passwordEncoder.matches("alvaro123", user.getPassword());
        assertTrue(match);
    }

    @Test
    void testToString(){
        User user = new User( "Alvaro", "alvaro@email.com", "alvaro123");

        String userString = "User{" +
                "id='" + user.getId() + '\'' +
                ", nickname='" + user.getNickname() + '\'' +
                ", email='" + user.getEmail() + '\'' +
                ", password='" + user.getPassword() + '\'' +
                '}';

        assertEquals(userString, user.toString());
    }
}

