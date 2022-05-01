package com.isabel.readit.services;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.*;
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
public class StoryServiceTest {

    private UserRepository userRepository;
    private StoryRepository storyRepository;
    private PasswordEncoder passwordEncoder;
    private StoryService storyService;


    @Autowired
    private StoryServiceTest(UserRepository userRepository, StoryRepository storyRepository, PasswordEncoder passwordEncoder, StoryService storyService){
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.storyService = storyService;
    }

    @BeforeAll
    void beforeAll() {
        User user = new User();
        user.setEmail("user@test.com");
        user.setPassword(passwordEncoder.encode("Password"));
        userRepository.save(user);
    }

    @Test
    void testCreateOk(){
        User user = new User();
        user.setEmail("user@test.com");
        user.setPassword(passwordEncoder.encode("Password"));

        StoryDto storyDto = StoryDto.builder()
                .title("Title")
                .description("This is just a description")
                .color("#FFFFFF")
                .genre1(Genre.COMEDY)
                .genre2(Genre.DRAMA)
                .status(Status.DROPPED)
                .privacy(Privacy.PRIVATE)
                .build();

        this.storyService.create(storyDto, user.getEmail());

        User newUser = this.userRepository.findByEmail(user.getEmail()).get();
        assertEquals(1,newUser.getStoryList().size());
        assertEquals("This is just a description", newUser.getStoryList().get(0).getDescription());
    }

    @Test
    void testCreateNotFound(){
        User user = new User();
        user.setEmail("notExists@test.com");
        user.setPassword(passwordEncoder.encode("Password"));

        StoryDto storyDto = StoryDto.builder()
                .title("Title")
                .description("This is just a description")
                .color("#FFFFFF")
                .genre1(Genre.COMEDY)
                .genre2(Genre.DRAMA)
                .status(Status.DROPPED)
                .privacy(Privacy.PRIVATE)
                .build();

        ForbiddenException thrown = assertThrows(
                ForbiddenException.class,
                () -> this.storyService.create(storyDto, user.getEmail()),
                "Expected storyService.create() to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("Forbidden Exception: User not found"));

    }

}
