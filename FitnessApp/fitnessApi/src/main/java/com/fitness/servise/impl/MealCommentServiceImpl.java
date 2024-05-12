package com.fitness.servise.impl;

import com.fitness.dto.MealCommentRequestDto;
import com.fitness.entities.MealComment;
import com.fitness.repository.MealCommentRepository;
import com.fitness.servise.MealCommentService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MealCommentServiceImpl implements MealCommentService {

    private final MealCommentRepository mealcommentRepository;

    public MealCommentServiceImpl(MealCommentRepository mealcommentRepository) {
        this.mealcommentRepository = mealcommentRepository;
    }

    @Override
    public MealComment saveMealComment(MealCommentRequestDto mealcommentRequestDto) {
        MealComment mealcomment = new MealComment();
        mealcomment.setText(mealcommentRequestDto.getText());
        mealcomment.setPostId(mealcommentRequestDto.getPostId());
        mealcomment.setCreatedAt(new Date());
        mealcomment.setUpdatedAt(new Date());
        return mealcommentRepository.save(mealcomment);
    }

    @Override
    public List<MealComment> getMealCommentsByPostId(long postId) {
        // Call the repository method to find all comments by post ID
        List<MealComment> mealcomments = mealcommentRepository.findByPostId(postId);
        return mealcomments;
    }
    

    @Override
    public void deleteMealCommentById(long id) {
        mealcommentRepository.deleteById(id);
    }

    @Override
    public MealComment updateMealComment(long id, MealCommentRequestDto mealcommentRequestDto) {
        Optional<MealComment> optionalMealComment = mealcommentRepository.findById(id);
        if (optionalMealComment.isPresent()) {
            MealComment mealcomment = optionalMealComment.get();
            mealcomment.setText(mealcommentRequestDto.getText());
            mealcomment.setUpdatedAt(new Date());
            return mealcommentRepository.save(mealcomment);
        } else {
            return null;
        }
    }
}
