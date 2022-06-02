package com.isabel.readit.data.daos;

import com.isabel.readit.data.model.*;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
public class DatabaseSeederDev {
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private final EpisodeRepository episodeRepository;


    @Autowired
    public DatabaseSeederDev(UserRepository userRepository, StoryRepository storyRepository, EpisodeRepository episodeRepository){
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
        this.episodeRepository = episodeRepository;
        this.deleteAllAndInitializeAndSeedDataBase();

    }

    public void deleteAllAndInitializeAndSeedDataBase() {
        this.deleteAllAndInitialize();
        this.seedDataBaseJava();
    }

    private void deleteAllAndInitialize(){
        this.episodeRepository.deleteAll();
        this.userRepository.deleteAll();
        this.storyRepository.deleteAll();
        LogManager.getLogger(this.getClass()).warn("------- Delete All -----------");
    }

    private void seedDataBaseJava() {
        LogManager.getLogger(this.getClass()).warn("------- Initial Load from JAVA -----------");
        User[] users = {
                User.builder()
                        .nickname("1")
                        .email("1@email.com")
                        .description("I am 1")
                        .password("Password")
                        .build(),
        };
        this.userRepository.saveAll(List.of(users));
        LogManager.getLogger(this.getClass()).warn("         ------- users");

        Story[]stories = {
                Story.builder().title("Title1")
                        .description("description1")
                        .privacy(Privacy.PRIVATE)
                        .genre2(Genre.COMEDY)
                        .genre1(Genre.ROMANCE)
                        .status(Status.COMPLETE)
                        .user(users[0])
                        .build(),
                Story.builder()
                        .title("Title2")
                        .description("description2")
                        .privacy(Privacy.PUBLIC)
                        .genre2(Genre.FANTASY)
                        .genre1(Genre.HISTORICAL)
                        .status(Status.COMPLETE)
                        .user(users[0])
                        .build(),
        };
        this.storyRepository.saveAll(List.of(stories));
        LogManager.getLogger(this.getClass()).warn("         ------- stories");

        Episode[] episodes = {
                Episode.builder().title("title1").numberEpisode(1).pdf("pdf 1").story(stories[0]).build(),
                Episode.builder().title("title2").numberEpisode(2).pdf("pdf 2").story(stories[0]).build(),
                Episode.builder().title("title3").numberEpisode(3).pdf("pdf 3").story(stories[1]).build()
        };
        this.episodeRepository.saveAll(List.of(episodes));
        LogManager.getLogger(this.getClass()).warn("         ------- episodes");
    }
}
