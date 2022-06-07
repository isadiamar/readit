package com.isabel.readit.services;

import com.isabel.readit.api.dtos.LikeDto;
import com.isabel.readit.data.daos.LikeRepository;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.Like;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.data.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class LikeService {
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LikeRepository likeRepository;


    public LikeDto create(LikeDto likeDto, String email) {
        Story story = this.storyRepository.findById(likeDto.getStoryId()).get();
        User user = this.userRepository.findByEmail(email).get();

        Like like = Like.builder()
                .story(story)
                .user(user)
                .build();

        this.likeRepository.save(like);
        likeDto.setId(like.getId());

        return likeDto;
    }

    public void delete(Integer storyId, Integer userId) {
        Story story = this.storyRepository.findById(storyId).get();
        User user = this.userRepository.findById(userId).get();
        this.likeRepository.deleteByUserAndStory(user, story);
    }

    public LikeDto getAll(Integer storyId, String email) {
        Story story = this.storyRepository.findById(storyId).get();
        User user = this.userRepository.findByEmail(email).get();

        LikeDto likeDto = LikeDto.builder().
                storyId(storyId)
                .userId(user.getId())
                .numberLikes(story.getLikeList().size())
                .build();

        return likeDto;
    }

    public boolean isLiked(Integer storyId, Integer userId) {
        Story story = this.storyRepository.findById(storyId).get();
        User user = this.userRepository.findById(userId).get();

        return this.likeRepository.findFirstByUserAndStory(user, story).isPresent();
    }
}
