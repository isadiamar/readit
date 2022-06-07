package com.isabel.readit.data.daos;

import com.isabel.readit.data.model.Like;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.data.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Integer> {
    Optional<Like> findFirstByUserAndStory(User user, Story story);

    void deleteByUserAndStory(User user, Story story);
}
