package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.api.dtos.UserDto;
import com.isabel.readit.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/update")
    public UserDto update(@RequestParam Integer id, @RequestBody UserDto userDto){
        return this.userService.update(id, userDto);
    }

    @GetMapping
    public UserDto get(@RequestParam Integer id){
        return this.userService.get(id);
    }
}
