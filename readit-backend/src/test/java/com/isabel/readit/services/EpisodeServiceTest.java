package com.isabel.readit.services;

import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.data.daos.EpisodeRepository;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.Episode;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.services.exceptions.ForbiddenException;
import com.isabel.readit.services.exceptions.NotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.support.TransactionSynchronizationAdapter;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Transactional
public class EpisodeServiceTest {

    private final UserRepository userRepository;
    private final StoryRepository storyRepository;
    private final PasswordEncoder passwordEncoder;
    private final StoryService storyService;
    private final EpisodeService episodeService;
    private final EpisodeRepository episodeRepository;

    @Autowired
    private EpisodeServiceTest(UserRepository userRepository, StoryRepository storyRepository, PasswordEncoder passwordEncoder,
                               StoryService storyService, EpisodeService episodeService, EpisodeRepository episodeRepository) {
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.storyService = storyService;
        this.episodeService = episodeService;
        this.episodeRepository = episodeRepository;
    }


    @Test
    void testCreateOk() {
        Story story = storyRepository.findByTitle("Title1").get();
        EpisodeDto episodeDto = EpisodeDto.builder()
                .title("Title")
                .pdf("pdf")
                .storyId(story.getId())
                .build();

        this.episodeService.create(episodeDto);

        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronizationAdapter() {
            @Override
            public void afterCommit() {
                Story story = storyRepository.findByTitle("Title1").get();
                assertEquals(3, story.getEpisodeList().size());
                assertEquals("title1", story.getEpisodeList().get(0).getTitle());
                assertEquals("title2", story.getEpisodeList().get(1).getTitle());
                assertEquals("Title", story.getEpisodeList().get(2).getTitle());
            }
        });
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
        Story story = storyRepository.findByTitle("Title1").get();
        Episode episode = episodeRepository.findByStoryAndTitle(story, "title1").get();

        EpisodeDto episodeDto1 = this.episodeService.get(story.getId(), episode.getId());
        assertEquals("title1", episodeDto1.getTitle());

        Episode episode2 = episodeRepository.findByStoryAndTitle(story, "title2").get();

        EpisodeDto episodeDto2 = this.episodeService.get(story.getId(), episode2.getId());
        assertEquals("title2", episodeDto2.getTitle());
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

        Story story = storyRepository.findByTitle("Title1").get();
        List<EpisodeDto> episodes = this.episodeService.getAll(story.getId());
        assertEquals(story.getEpisodeList().size(), episodes.size());
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
        Story story = storyRepository.findByTitle("Title1").get();
        Episode episode = episodeRepository.findByStoryAndTitle(story, "title1").get();

        this.episodeService.delete(story.getId(), episode.getId());

        ForbiddenException thrown = assertThrows(
                ForbiddenException.class,
                () -> this.episodeService.get(story.getId(), episode.getId()),
                "Expected episodeService.get() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("Forbidden Exception: Episode not found"));
    }

    @Test
    void testUpdate() {
        Story story = storyRepository.findByTitle("Title1").get();

        EpisodeDto episodeDtoNotEdited = EpisodeDto.builder()
                .title("Not edited")
                .pdf("pdf")
                .storyId(story.getId())
                .build();

        this.episodeService.create(episodeDtoNotEdited);

        EpisodeDto episodeDtoEdited = EpisodeDto.builder()
                .title("Edited")
                .pdf("pdf")
                .storyId(story.getId())
                .build();

        EpisodeDto episodeDto = this.episodeService.update(story.getId(), episodeDtoNotEdited.getId(), episodeDtoEdited);
        assertEquals("Edited", episodeDto.getTitle());
        assertEquals("Not edited", episodeDtoNotEdited.getTitle());
    }

    @Test
    void testUpdateNotFound() {
        Story story = storyRepository.findByTitle("Title1").get();

        EpisodeDto episodeDtoNotEdited = EpisodeDto.builder()
                .title("Not edited")
                .pdf("pdf")
                .storyId(story.getId())
                .build();

        ForbiddenException thrown_story = assertThrows(
                ForbiddenException.class,
                () -> this.episodeService.update(123, episodeDtoNotEdited.getId(), episodeDtoNotEdited),
                "Expected episodeService.update() to throw, but it didn't"
        );
        assertTrue(thrown_story.getMessage().contains("Forbidden Exception: Story not found"));

        NotFoundException thrown = assertThrows(
                NotFoundException.class,
                () -> this.episodeService.update(story.getId(), 2354, episodeDtoNotEdited),
                "Expected episodeService.update() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("Not Found Exception. Episode not found"));

    }
}
