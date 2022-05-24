package com.isabel.readit.services;

import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.data.daos.EpisodeRepository;
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
public class EpisodeServiceTest {

    private UserRepository userRepository;
    private StoryRepository storyRepository;
    private EpisodeRepository episodeRepository;
    private PasswordEncoder passwordEncoder;
    private StoryService storyService;
    private AuthService authService;
    private EpisodeService episodeService;

    @Autowired
    private EpisodeServiceTest(UserRepository userRepository, StoryRepository storyRepository, PasswordEncoder passwordEncoder,
                               StoryService storyService, AuthService authService, EpisodeService episodeService, EpisodeRepository episodeRepository) {
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.storyService = storyService;
        this.authService = authService;
        this.episodeRepository = episodeRepository;
        this.episodeService = episodeService;
    }

    @BeforeAll
    void beforeAll() {
        User user = new User();
        user.setEmail("user@test.com");
        user.setPassword(passwordEncoder.encode("Password"));
        userRepository.save(user);

        StoryDto storyDto = StoryDto.builder()
                .title("Story Title")
                .description("Story description")
                .color("#FFFFFF")
                .genre1(Genre.COMEDY)
                .genre2(Genre.FANTASY)
                .status(Status.DROPPED)
                .privacy(Privacy.PUBLIC)
                .build();

        StoryDto story = this.storyService.create(storyDto, user.getEmail());

        EpisodeDto episodeDto = EpisodeDto.builder()
                .title("Episodio")
                .pdf("pdf")
                .storyId(story.getId())
                .build();
        this.episodeService.create(episodeDto);
    }

    @Test
    void testCreateOk(){
        EpisodeDto episodeDto = EpisodeDto.builder()
                .title("Title")
                .pdf("pdf")
                .storyId(1)
                .build();

        this.episodeService.create(episodeDto);

        Story story = this.storyRepository.findById(1).get();
        assertEquals(2,story.getEpisodeList().size());
        assertEquals("Episodio", story.getEpisodeList().get(0).getTitle());
        assertEquals("Title", story.getEpisodeList().get(1).getTitle());

    }

    @Test
    void testCreateNotFound(){
        EpisodeDto episodeDto = EpisodeDto.builder()
                .title("Title")
                .pdf("pdf")
                .storyId(100000)
                .build();

        ForbiddenException thrown = assertThrows(
                ForbiddenException.class,
                () -> this.episodeService.create(episodeDto),
                "Expected storyService.create() to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("Forbidden Exception: Story not found"));
    }

    @Test
    void testGetOk(){
        EpisodeDto episodeDto1 = this.episodeService.get(1,1);
        assertEquals("Episodio", episodeDto1.getTitle());

        EpisodeDto episodeDto2 = this.episodeService.get(1,2);
        assertEquals("Title", episodeDto2.getTitle());
    }

    @Test
    void testGetForbidden(){
        ForbiddenException thrown = assertThrows(
                ForbiddenException.class,
                () -> this.episodeService.get(45624, 1),
                "Expected storyService.get() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("Forbidden Exception: Story not found"));
    }
}
