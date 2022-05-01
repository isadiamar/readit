package com.isabel.readit.services;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.exceptions.ForbiddenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoryService {
    private StoryRepository storyRepository;
    private UserRepository userRepository;

    @Autowired
    public StoryService(UserRepository userRepository, StoryRepository storyRepository) {
        this.userRepository = userRepository;
        this.storyRepository = storyRepository;
    }

    public StoryDto create(StoryDto storyDto, String email) {
        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new ForbiddenException("User not found"));
        Story story = Story.builder()
                .title(storyDto.getTitle())
                .description(storyDto.getDescription())
                .genre1(storyDto.getGenre1())
                .genre2(storyDto.getGenre2())
                .privacy(storyDto.getPrivacy())
                .status(storyDto.getStatus())
                .color(storyDto.getColor())
                .storyCover(storyDto.getStoryCover())
                .user(user)
                .build();
        this.storyRepository.save(story);
        storyDto.setId(story.getId());
        return storyDto;
    }
}
