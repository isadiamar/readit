package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(UserController.USERS)
public class UserController {
    static final String USERS = "/api/private/users";

    @Autowired
    private UserService userService;

    @GetMapping("/storyList")
    public List<StoryDto> findStoryList(@RequestParam Integer userId){
        return this.userService.findStoryList(userId);
    }

    @GetMapping("/favouriteStories")
    public List<StoryDto> getFavouriteStories(@RequestParam Integer userId){
        return this.userService.getFavouriteStories(userId);
    }
}
