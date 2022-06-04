package com.isabel.readit.services;

import com.isabel.readit.api.dtos.LikeDto;
import com.isabel.readit.data.daos.CommentRepository;
import com.isabel.readit.data.daos.EpisodeRepository;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.Like;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.data.model.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.support.TransactionSynchronizationAdapter;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Transactional
public class LikeServiceTest {

    private LikeService likeService;
    private UserRepository userRepository;
    private StoryRepository storyRepository;

    @Autowired
    private LikeServiceTest(UserRepository userRepository, LikeService likeService,StoryRepository storyRepository) {
        this.userRepository = userRepository;
        this.likeService = likeService;
        this.storyRepository = storyRepository;
    }

    @BeforeAll
    void init(){
        User user = User.builder().email("test@test").nickname("test").description("test").password("password").build();
        this.userRepository.save(user);
    }
    @Test
    void testCreateAndDeleteOk(){
        Story story = storyRepository.findByTitle("Title1").get();
        LikeDto likeDto = LikeDto.builder().storyId(story.getId()).build();

        LikeDto dto = this.likeService.create(likeDto, "test@test");
        assertEquals(2, story.getLikeList().size());

        this.likeService.delete(dto.getId());
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronizationAdapter() {
            @Override
            public void afterCommit() {
                Story story = storyRepository.findByTitle("Title1").get();
                assertEquals(1, story.getLikeList().size());
            }
        });
    }

    @Test
    void testGetAllOk(){
        Story story = storyRepository.findByTitle("Title1").get();
        this.likeService.getAll(story.getId(),"1@email.com");
        assertEquals(1, story.getLikeList().size());
    }

}
