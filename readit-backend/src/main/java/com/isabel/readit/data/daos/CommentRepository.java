package com.isabel.readit.data.daos;

import com.isabel.readit.data.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Optional<Comment> findByDescription(String description);
}
