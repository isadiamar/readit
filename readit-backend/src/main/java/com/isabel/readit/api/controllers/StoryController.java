package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.data.model.Genre;
import com.isabel.readit.services.StoryService;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public StoryDto create(@RequestBody StoryDto storyDto) {
        String email = this.jwtService.getTokenEmailFromContext();
        return this.storyService.create(storyDto, email);
    }

    @GetMapping("/{id}")
    public StoryDto get(@PathVariable Integer id) {
        return this.storyService.get(id);
    }

    @GetMapping()
    public List<StoryDto> getAllById() {
        return this.storyService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        String email = jwtService.getTokenEmailFromContext();
        this.storyService.delete(id, email);
    }

    @PutMapping("/{id}")
    public StoryDto update(@PathVariable Integer id, @Valid @RequestBody StoryDto storyDto) {
        return this.storyService.update(id, storyDto);
    }

    @GetMapping("/filter")
    public List<StoryDto> findByGenre1(@RequestParam String genre){
        return this.storyService.findByGenre1(genre);
    }

    @GetMapping("/filter/status")
    public List<StoryDto> findByGenre1AndStatus(@RequestParam String genre, String status){
        return this.storyService.findByGenreAndStatus(genre,status);
    }

    @GetMapping("/sort")
    public List<StoryDto> sortByGenre1AndPopularity(@RequestParam String genre){
        return this.storyService.sortByGenre1AndPopularity(genre);
    }

    @GetMapping("/newness")
    public List<StoryDto> findByNewness(){
        return this.storyService.findByNewness();
    }

    @GetMapping("/filter/popularity")
    public List<StoryDto> findByPopularity(){
        return this.storyService.findByPopularity();
    }

    @GetMapping("/size")
    public Integer getSize(@RequestParam Integer storyId){
        return this.storyService.getSize(storyId);
    }
}
