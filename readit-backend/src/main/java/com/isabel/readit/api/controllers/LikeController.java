package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.LikeDto;
import com.isabel.readit.services.LikeService;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(LikeController.LIKES)
public class LikeController {
    static final String LIKES = "/api/private/likes";

    @Autowired
    private LikeService likeService;
    @Autowired
    private JWTService jwtService;

    @PostMapping("/new")
    public LikeDto create(@RequestBody LikeDto likeDto) {
        String email = this.jwtService.getTokenEmailFromContext();

        return this.likeService.create(likeDto, email);
    }

    @DeleteMapping
    public void delete(@RequestParam Integer storyId, @RequestParam Integer userId) {
        this.likeService.delete(storyId, userId);
    }

    @GetMapping
    public LikeDto getAll(@RequestParam Integer storyId) {
        String email = this.jwtService.getTokenEmailFromContext();
        return this.likeService.getAll(storyId, email);
    }

    @GetMapping("/isliked")
    public boolean isLiked(@RequestParam Integer storyId, @RequestParam Integer userId) {
        return this.likeService.isLiked(storyId, userId);
    }
}
