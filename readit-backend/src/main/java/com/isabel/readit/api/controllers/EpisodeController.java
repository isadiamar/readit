package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.services.EpisodeService;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(EpisodeController.EPISODES)
public class EpisodeController {
    static final String EPISODES = "/api/private/episodes";

    @Autowired
    private EpisodeService episodeService;
    @Autowired
    private JWTService jwtService;


    @PostMapping("/new")
    public EpisodeDto create(@RequestBody EpisodeDto episodeDto) {

        return this.episodeService.create(episodeDto);
    }

    @GetMapping("/{episodeId}" + "/from/" + "{storyId}")
    public EpisodeDto get(@PathVariable Integer storyId, @PathVariable Integer episodeId) {
        return this.episodeService.get(storyId, episodeId);
    }

    @GetMapping
    public List<EpisodeDto> get(@RequestParam Integer storyId) {
        return this.episodeService.getAll(storyId);
    }

    @DeleteMapping
    public void delete(@RequestParam Integer storyId, @RequestParam Integer episodeId) {
        this.episodeService.delete(storyId, episodeId);
    }

    @PutMapping
    public EpisodeDto update(@RequestParam Integer storyId, @RequestParam Integer episodeId, @RequestBody EpisodeDto episodeDto) {
        return this.episodeService.update(storyId, episodeId, episodeDto);
    }
}
