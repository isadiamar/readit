package com.isabel.readit.services;

import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.data.daos.EpisodeRepository;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.*;
import com.isabel.readit.services.exceptions.ForbiddenException;
import com.isabel.readit.services.exceptions.NotFoundException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class EpisodeServiceTest {

    private UserRepository userRepository;
    private StoryRepository storyRepository;
    private PasswordEncoder passwordEncoder;
    private StoryService storyService;
    private EpisodeService episodeService;

    @Autowired
    private EpisodeServiceTest(UserRepository userRepository, StoryRepository storyRepository, PasswordEncoder passwordEncoder,
                               StoryService storyService, EpisodeService episodeService) {
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.storyService = storyService;
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
    void testCreateOk() {
        EpisodeDto episodeDto = EpisodeDto.builder()
                .title("Title")
                .pdf("pdf")
                .storyId(1)
                .build();

        this.episodeService.create(episodeDto);

        Story story = this.storyRepository.findById(1).get();
        assertEquals(2, story.getEpisodeList().size());
        assertEquals("Episodio", story.getEpisodeList().get(0).getTitle());
        assertEquals("Title", story.getEpisodeList().get(1).getTitle());

    }

    @Test
    void testCreateNotFound() {
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
    void testGetOk() {
        EpisodeDto episodeDto1 = this.episodeService.get(1, 1);
        assertEquals("Episodio", episodeDto1.getTitle());

        EpisodeDto episodeDto2 = this.episodeService.get(1, 2);
        assertEquals("Title", episodeDto2.getTitle());
    }

    @Test
    void testGetForbidden() {
        ForbiddenException thrown = assertThrows(
                ForbiddenException.class,
                () -> this.episodeService.get(45624, 1),
                "Expected storyService.get() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("Forbidden Exception: Story not found"));
    }

    @Test
    void testGetAllOk() {
        List<EpisodeDto> episodes = this.episodeService.getAll(1);
        assertEquals(2, episodes.size());
        assertEquals("Episodio", episodes.get(0).getTitle());
        assertEquals("Title", episodes.get(1).getTitle());
    }

    @Test
    void testGetAllForbidden() {
        ForbiddenException thrown = assertThrows(
                ForbiddenException.class,
                () -> this.episodeService.getAll(45624),
                "Expected episodeService.getAll() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("Forbidden Exception: Story not found"));
    }

    @Test
    void testDeleteOk() {
        this.episodeService.delete(1, 1);
        ForbiddenException thrown = assertThrows(
                ForbiddenException.class,
                () -> this.episodeService.get(1, 1),
                "Expected episodeService.get() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("Forbidden Exception: Episode not found"));
    }

    @Test
    void testUpdate() {
        EpisodeDto episodeDtoNotEdited = EpisodeDto.builder()
                .title("Not edited")
                .pdf("pdf")
                .storyId(1)
                .build();

        this.episodeService.create(episodeDtoNotEdited);

        EpisodeDto episodeDtoEdited = EpisodeDto.builder()
                .title("Edited")
                .pdf("pdf")
                .storyId(1)
                .build();

        EpisodeDto episodeDto = this.episodeService.update(1, 3, episodeDtoEdited);
        assertEquals("Edited", episodeDto.getTitle());
        assertEquals("Not edited", episodeDtoNotEdited.getTitle());
    }

    @Test
    void testUpdateNotFound() {
        EpisodeDto episodeDtoNotEdited = EpisodeDto.builder()
                .title("Not edited")
                .pdf("pdf")
                .storyId(1)
                .build();

        ForbiddenException thrown_story = assertThrows(
                ForbiddenException.class,
                () -> this.episodeService.update(123, 1, episodeDtoNotEdited),
                "Expected episodeService.update() to throw, but it didn't"
        );
        assertTrue(thrown_story.getMessage().contains("Forbidden Exception: Story not found"));

        NotFoundException thrown = assertThrows(
                NotFoundException.class,
                () -> this.episodeService.update(1, 2354, episodeDtoNotEdited),
                "Expected episodeService.update() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("Not Found Exception. Episode not found"));

    }
}
