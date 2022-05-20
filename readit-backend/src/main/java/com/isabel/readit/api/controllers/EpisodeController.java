package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.services.EpisodeService;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(EpisodeController.EPISODES)
public class EpisodeController {
    static final String EPISODES = "/api/private/episodes";

    @Autowired
    private EpisodeService episodeService;
    @Autowired
    private JWTService jwtService;


    @PostMapping("/new")
    public EpisodeDto create (@RequestBody EpisodeDto episodeDto){

        return this.episodeService.create(episodeDto);
    }

    @GetMapping("/{ep_id}" + "/from/" + "{st_id}")
    public EpisodeDto get (@PathVariable Integer st_id, @PathVariable Integer ep_id){
         return this.episodeService.get(st_id,ep_id);
    }
}
