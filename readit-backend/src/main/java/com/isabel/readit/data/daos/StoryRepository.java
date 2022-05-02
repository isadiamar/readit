package com.isabel.readit.data.daos;

import com.isabel.readit.data.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, Integer> {
    Optional<Story> findById(Integer id);
}
