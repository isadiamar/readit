package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.services.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(StoryController.STORIES)
public class StoryController {
    static final String STORIES = "/api/private/story";

    @Autowired
    private StoryService storyService;

    @PostMapping("/new")
    public StoryDto create(@RequestBody @Valid StoryDto storyDto){
        return this.storyService.create(storyDto);
    }
}
