package com.isabel.readit.services;

import com.isabel.readit.api.dtos.CommentDto;
import com.isabel.readit.data.daos.CommentRepository;
import com.isabel.readit.data.daos.EpisodeRepository;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.Comment;
import com.isabel.readit.data.model.Episode;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.exceptions.NotFoundException;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommentService {
    private EpisodeRepository episodeRepository;
    private UserRepository userRepository;
    private StoryRepository storyRepository;
    private CommentRepository commentRepository;
    private JWTService jwtService;

    @Autowired
    public CommentService(EpisodeRepository episodeRepository, StoryRepository storyRepository, CommentRepository commentRepository, JWTService jwtService, UserRepository userRepository){
        this.episodeRepository = episodeRepository;
        this.commentRepository = commentRepository;
        this.storyRepository = storyRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public CommentDto create(CommentDto commentDto) {
        Episode episode = this.episodeRepository.findById(commentDto.getEpisodeId()).orElseThrow(() -> new NotFoundException("Episode not found"));
        String email = this.jwtService.getTokenEmailFromContext();
        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        Comment comment = Comment.builder()
                .description(commentDto.getDescription())
                .date(LocalDate.now())
                .episode(episode)
                .user(user)
                .build();

        this.commentRepository.save(comment);

        commentDto.setId(comment.getId());
        return commentDto;
    }

    public List<CommentDto> getAll(Integer episodeId) {
        Episode episode = this.episodeRepository.findById(episodeId).orElseThrow(() -> new NotFoundException("Episode not found"));
        return episode.getCommentList().stream().map(Comment::toCommentDto).collect(Collectors.toList());
    }

    public void delete(Integer commentId) {
        this.commentRepository.deleteById(commentId);
    }
}

