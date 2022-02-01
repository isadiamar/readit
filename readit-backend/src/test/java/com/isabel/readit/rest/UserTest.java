package com.isabel.readit.rest;

import com.isabel.readit.data.UserEntity;
import com.isabel.readit.rest.dtos.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    void testGetSetId(){
        User user =   new User("1", "Maria", "maria@email.com", "maria123");
        assertEquals("1",user.getId());

        user.setId("10");
        assertEquals("10", user.getId());
    }

    @Test
    void testGetSetNickname(){
        User user =new User("2", "Pedro", "pedro@email.com", "pedro123");

        assertEquals("Pedro",user.getNickname());

        user.setNickname("Frida");
        assertEquals("Frida", user.getNickname());
    }

    @Test
    void testGetSetEmail(){
        User user =new User("3", "Alvaro", "alvaro@email.com", "alvaro123");

        assertEquals("alvaro@email.com", user.getEmail());

        user.setEmail("juan@email.com");
        assertEquals("juan@email.com", user.getEmail());
    }

    @Test
    void testGetSetPassword(){
        UserEntity userEntity =new UserEntity("3", "Alvaro", "alvaro@email.com", "alvaro123");
        User user = new User(userEntity);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        boolean match = passwordEncoder.matches("alvaro123", user.getPassword());
        assertTrue(match);
    }
}

