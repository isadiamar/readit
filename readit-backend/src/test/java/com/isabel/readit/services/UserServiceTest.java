package com.isabel.readit.services;

import com.isabel.readit.api.dtos.UserDto;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserServiceTest {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StoryRepository storyRepository;

    @Test
    void testIsStoryFromUser(){
        Integer userId = this.userRepository.findByEmail("1@email.com").get().getId();
        Integer storyId = this.storyRepository.findByTitle("Title1").get().getId();

        boolean res = this.userService.isStoryFromUser(userId,storyId);
        assertTrue(res);
    }

    @Test
    void testGetUser(){
        Integer userId = this.userRepository.findByEmail("1@email.com").get().getId();

        UserDto userDto = this.userService.get(userId);
        assertEquals("1", userDto.getNickname());
        assertEquals("I am 1", userDto.getDescription());

    }
}
