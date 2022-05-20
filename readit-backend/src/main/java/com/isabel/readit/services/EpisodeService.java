package com.isabel.readit.services;

import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.data.daos.EpisodeRepository;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.model.Episode;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.services.exceptions.ForbiddenException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class EpisodeService {

    private static Logger logger = LoggerFactory.getLogger(EpisodeService.class);

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private EpisodeRepository episodeRepository;

    public EpisodeDto create(EpisodeDto episodeDto) {
        Story story = this.storyRepository.findById(episodeDto.getStory_id()).orElseThrow(() -> new ForbiddenException("Story not found"));

        Episode episode = Episode.builder()
                .title(episodeDto.getTitle())
                .pdf(episodeDto.getPdf())
                .date(LocalDate.now())
                .story(story)
                .build();

        this.episodeRepository.save(episode);
        episodeDto.setId(episode.getId());
        return episodeDto;
    }

    public EpisodeDto get(Integer storyId, Integer episodeId) {
        Story story = this.storyRepository.findById(storyId).orElseThrow(() -> new ForbiddenException("Story not found"));

        Optional<Episode> a = this.episodeRepository.findByStoryAndId(story, episodeId);

        return a.get().toEpisodeDto();
    }
}
