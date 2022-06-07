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
    @Autowired
    private JWTService jwtService;

    @PostMapping("/new")
    public CommentDto create(@RequestBody CommentDto commentDto) {
        String email = this.jwtService.getTokenEmailFromContext();
        return this.commentService.create(commentDto, email);
    }

    @GetMapping
    public List<CommentDto> getAll(@RequestParam Integer episodeId) {
        return this.commentService.getAll(episodeId);
    }

    @DeleteMapping
    public void delete(@RequestParam Integer commentId) {
        this.commentService.delete(commentId);
    }
}
