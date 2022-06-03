package com.isabel.readit.services;

import com.isabel.readit.api.dtos.CommentDto;
import com.isabel.readit.data.daos.CommentRepository;
import com.isabel.readit.data.daos.EpisodeRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.*;
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
public class CommentServiceTest {

    @Autowired
    private EpisodeService episodeService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private EpisodeRepository episodeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Test
    void testCreateOk() {
        Episode episode = this.episodeRepository.findByTitle("title1").get();
        Integer episodeId = episode.getId();

        String username = this.userRepository.findByEmail("1@email.com").get().getNickname();
        CommentDto commentDto = CommentDto.builder()
                .description("comment3")
                .episodeId(episodeId)
                .username(username)
                .build();

        this.commentService.create(commentDto, "1@email.com");

        assertEquals(2, episode.getCommentList().size());
    }

    @Test
    void testGetAllOk(){
        Episode episode = this.episodeRepository.findByTitle("title3").get();
        Integer episodeId = episode.getId();
        this.commentService.getAll(episodeId);
        assertEquals(1, episode.getCommentList().size());
    }

    @Test
    void testDeleteOk(){
        User user = this.userRepository.findByEmail("1@email.com").get();

        assertEquals(2,user.getCommentList().size() );

        Integer commentId = this.commentRepository.findByDescription("comment2").get().getId();
        this.commentService.delete(commentId);
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronizationAdapter() {
            @Override
            public void afterCommit() {
                User user = userRepository.findByEmail("1@email.com").get();
                assertEquals(1,user.getCommentList().size() );

            }
        });
    }
}
