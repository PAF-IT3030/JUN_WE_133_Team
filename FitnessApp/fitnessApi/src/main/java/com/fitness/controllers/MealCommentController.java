package com.fitness.controllers;

import com.fitness.dto.MealCommentRequestDto;
import com.fitness.entities.MealComment;
import com.fitness.servise.MealCommentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/mealcomment")
public class MealCommentController {

    private final MealCommentService mealcommentService;

    public MealCommentController(MealCommentService mealcommentService) {
        this.mealcommentService = mealcommentService;
    }

    @PostMapping // Create comment
    public ResponseEntity<MealComment> saveMealComment(@Valid @RequestBody MealCommentRequestDto mealcommentRequestDto) {
        return ResponseEntity.ok(mealcommentService.saveMealComment(mealcommentRequestDto));
    }

    @GetMapping("/{postId}") // Get comments by post id
    public ResponseEntity<List<MealComment>> getMealCommentsByPostId(@PathVariable("postId") long postId) {
        List<MealComment> comments = mealcommentService.getMealCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{postId}/{id}") // Delete comment
    public ResponseEntity<String> deleteMealCommentById(@PathVariable("id") long id) {
        mealcommentService.deleteMealCommentById(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PutMapping("/{postId}/{id}") // Update comment
    public ResponseEntity<MealComment> updateMealComment(@PathVariable("id") long id, @Valid @RequestBody MealCommentRequestDto mealcommentRequestDto) {
        MealComment updatedComment = mealcommentService.updateMealComment(id, mealcommentRequestDto);
        if (updatedComment != null) {
            return ResponseEntity.ok(updatedComment);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if comment not found
        }
    }
}
