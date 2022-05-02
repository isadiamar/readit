package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.services.StoryService;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(StoryController.STORIES)
public class StoryController {
    static final String STORIES = "/api/private/stories";

    @Autowired
    private StoryService storyService;
    @Autowired
    private JWTService jwtService;

    @PostMapping("/new")
    public StoryDto create (@RequestBody StoryDto storyDto){
        String email = this.jwtService.getTokenEmailFromContext();
        return this.storyService.create(storyDto, email);
    }

    @GetMapping("/{id}")
    public StoryDto get(@PathVariable Integer id){
        return this.storyService.get(id);
    }

    @GetMapping()
    public List<StoryDto> getAllById(){
        return this.storyService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
         this.storyService.delete(id);
    }
}
