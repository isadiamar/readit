package com.isabel.readit.services;

import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.data.daos.EpisodeRepository;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.model.Episode;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.services.exceptions.ForbiddenException;
import com.isabel.readit.services.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
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
        return this.episodeRepository.findByStoryAndId(story, episodeId).map(Episode::toEpisodeDto)
                .orElseThrow(() -> new ForbiddenException(("Episode not found")));
    }

    public List<EpisodeDto> getAll(Integer storyId) {
        Story story = this.storyRepository.findById(storyId).orElseThrow(() -> new ForbiddenException("Story not found"));
        for (int i = 0; i < story.getEpisodeList().size(); i++) {
            story.getEpisodeList().get(i).setNumberEpisode(i + 1);
        }
        return story.getEpisodeList().stream().map(Episode::toEpisodeDto).collect(Collectors.toList());
    }

    public void delete(Integer storyId, Integer episodeId) {
        Story story = this.storyRepository.findById(storyId).orElseThrow(() -> new ForbiddenException("Story not found"));
        story.setEpisodeList(story.getEpisodeList().stream().filter(e -> e.getId() != episodeId).collect(Collectors.toList()));
        this.episodeRepository.deleteByStoryAndId(story, episodeId);
        this.storyRepository.save(story);
    }

    public EpisodeDto update(Integer storyId, Integer episodeId, EpisodeDto episodeDto) {
        Story story = this.storyRepository.findById(storyId).orElseThrow(() -> new ForbiddenException("Story not found"));
        Episode episode = this.episodeRepository.findByStoryAndId(story, episodeId)
                .map(episodeEntity -> {
                    episodeDto.setId(episodeEntity.getId());
                    episodeDto.setDate(LocalDate.now());
                    BeanUtils.copyProperties(episodeDto, episodeEntity);
                    return episodeEntity;
                }).orElseThrow(() -> new NotFoundException("Episode not found"));

        this.episodeRepository.save(episode);
        return episode.toEpisodeDto();
    }

    public EpisodeDto findEpisodeByStoryAndNumberEpisode(Integer storyId, Integer numberEpisode) {
        Story story = this.storyRepository.findById(storyId).orElseThrow(() -> new NotFoundException("Episode not found"));
        return this.episodeRepository.findFirstByStoryAndNumberEpisode(story, numberEpisode).map(Episode::toEpisodeDto).get();
    }
}
