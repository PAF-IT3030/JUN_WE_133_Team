package com.fitness.repository;

import com.fitness.entities.MealComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealCommentRepository extends JpaRepository<MealComment, Long> {
    List<MealComment> findByPostId(long postId);
}
