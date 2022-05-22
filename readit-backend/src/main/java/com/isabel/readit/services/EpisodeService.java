package com.isabel.readit.services;

import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.data.daos.EpisodeRepository;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.model.Episode;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.services.exceptions.ForbiddenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class EpisodeService {


    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private EpisodeRepository episodeRepository;

    public EpisodeDto create(EpisodeDto episodeDto) {
        Story story = this.storyRepository.findById(episodeDto.getStoryId()).orElseThrow(() -> new ForbiddenException("Story not found"));

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

        Optional<Episode> episode = this.episodeRepository.findByStoryAndId(story, episodeId);

        EpisodeDto episodeDto =  episode.get().toEpisodeDto();
        episodeDto.setNumberEpisode(story.getEpisodeList().size() + 1);
        return episodeDto;
    }
}
