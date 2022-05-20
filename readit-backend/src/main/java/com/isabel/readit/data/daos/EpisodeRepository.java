package com.isabel.readit.data.daos;

import com.isabel.readit.data.model.Episode;
import com.isabel.readit.data.model.Story;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EpisodeRepository extends JpaRepository<Episode, Integer> {
    Optional<Episode> findByStoryAndId(Story story, Integer id);
}
