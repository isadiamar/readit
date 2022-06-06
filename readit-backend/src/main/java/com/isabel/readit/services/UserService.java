package com.isabel.readit.services;


import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.Like;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.data.model.User;
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
}
