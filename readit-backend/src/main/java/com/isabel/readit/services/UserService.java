package com.isabel.readit.services;


import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.api.dtos.UserDto;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.Like;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public List<StoryDto> findStoryList(Integer userId) {
        User user =  this.userRepository.findById(userId).get();
        return user.getStoryList().stream().map(Story::toStoryDto).collect(Collectors.toList());
    }

    public List<StoryDto> getFavouriteStories(Integer userId) {
        List<StoryDto> res = new ArrayList<>();

        List<Like> likeList =  this.userRepository.findById(userId).map(User::getLikeList).get();
        for (Like like : likeList) {
            res.add(like.getStory().toStoryDto());
        }
        return res;
    }

    public UserDto update(Integer id, UserDto userDto) {
        User user =  this.userRepository.findById(id)
                .map(userEntity -> {
                    userDto.setId(userEntity.getId());
                    BeanUtils.copyProperties(userDto,userEntity);
                    return userEntity;
                }).orElseThrow(() -> new NotFoundException("User not found"));
        return user.toUserDto();

    }

    public UserDto get(Integer id) {
        return this.userRepository.findById(id).map(User::toUserDto).orElseThrow(() -> new NotFoundException("User not found"));
    }

    public boolean isStoryFromUser(Integer userId, Integer storyId) {
        boolean res = false;
        List<Story> storyList =  this.userRepository.findById(userId).map(User::getStoryList).get();
        for (Story story: storyList){
            if (story.getId().equals(storyId)) {
                res = true;
                break;
            }
        }
        return res;
    }
}
