package com.fitness.servise;

import com.fitness.dto.MealCommentRequestDto;
import com.fitness.entities.MealComment;

import java.util.List;

public interface MealCommentService {
    MealComment saveMealComment(MealCommentRequestDto mealcommentRequestDto);
    List<MealComment> getMealCommentsByPostId(long postId);
    void deleteMealCommentById(long id);
    MealComment updateMealComment(long id, MealCommentRequestDto mealcommentRequestDto);
}
