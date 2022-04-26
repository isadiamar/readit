package com.isabel.readit.services;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.model.Story;
import org.springframework.stereotype.Service;

@Service
public class StoryService {
    private StoryRepository storyRepository;

    public StoryDto create(StoryDto storyDto) {
        Story story = Story.builder()
                .title(storyDto.getTitle())
                .description(storyDto.getDescription())
                .genreList(storyDto.getGenreList())
                .privacy(storyDto.getPrivacy())
                .status(storyDto.getStatus())
                .color(storyDto.getColor())
                .storyCover(storyDto.getStoryCover())
                .build();
        this.storyRepository.save(story);
        return storyDto;
    }
}
