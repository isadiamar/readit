package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.CommentDto;
import com.isabel.readit.services.CommentService;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(CommentController.COMMENTS)
public class CommentController {
    static final String COMMENTS = "/api/private/comments";

    @Autowired
    private CommentService commentService;

    @PostMapping("/new")
    public CommentDto create(@RequestBody CommentDto commentDto) {
        return this.commentService.create(commentDto);
    }

    @GetMapping
    public List<CommentDto> getAll(@RequestParam Integer episodeId){
        return this.commentService.getAll(episodeId);
    }
}
