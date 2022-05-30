package com.isabel.readit.services;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.exceptions.ForbiddenException;
import com.isabel.readit.services.exceptions.NotFoundException;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class StoryService {
    private StoryRepository storyRepository;
    private UserRepository userRepository;
    private JWTService jwtService;

    @Autowired
    public StoryService(UserRepository userRepository, StoryRepository storyRepository, JWTService jwtService) {
        this.userRepository = userRepository;
        this.storyRepository = storyRepository;
        this.jwtService = jwtService;
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
                .cover(storyDto.getCover())
                .user(user)
                .build();
        this.storyRepository.save(story);
        storyDto.setId(story.getId());
        storyDto.setUsername(user.getNickname());
        return storyDto;
    }

    public StoryDto get(Integer id) {
        Story story = this.storyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Story not found"));
        return story.toStoryDto();
    }

    public List<StoryDto> getAll() {
        String email = jwtService.getTokenEmailFromContext();
        return this.storyRepository.findAll().stream()
                .filter(story -> story.getUser().getEmail().equals(email))
                .map(Story::toStoryDto).collect(Collectors.toList());
    }

    public void delete(Integer id, String email) {
        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new ForbiddenException("User not found"));
        user.setStoryList(user.getStoryList().stream().filter(story -> !Objects.equals(story.getId(), id)).collect(Collectors.toList()));
        this.storyRepository.deleteById(id);
        this.userRepository.save(user);
    }

    public StoryDto update(Integer id, StoryDto storyDto) {
        Story story = this.storyRepository.findById(id)
                .map(storyEntity -> {
                    BeanUtils.copyProperties(storyDto, storyEntity);
                    return storyEntity;
                }).orElseThrow(() -> new NotFoundException("Story not found"));

        story.setId(storyDto.getId());
        this.storyRepository.save(story);
        return story.toStoryDto();
    }
}
