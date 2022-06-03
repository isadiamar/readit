package com.isabel.readit.data.daos;

import com.isabel.readit.data.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Integer> {
}
