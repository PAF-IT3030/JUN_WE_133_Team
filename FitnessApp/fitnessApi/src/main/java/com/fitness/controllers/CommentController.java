package com.fitness.controllers;

import com.fitness.dto.CommentRequestDto;
import com.fitness.entities.Comment;
import com.fitness.servise.CommentService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping // Create comment
    public ResponseEntity<Comment> saveComment(@Valid @RequestBody CommentRequestDto commentRequestDto) {
        return ResponseEntity.ok(commentService.saveComment(commentRequestDto));
    }

    @GetMapping("/{postId}") // Get comments by post id
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable("postId") long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{postId}/{id}") // Delete comment
    public ResponseEntity<String> deleteComment(@PathVariable("id") long id) {
        commentService.deleteCommentById(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PutMapping("/{postId}/{id}") // Update comment
    public ResponseEntity<Comment> updateComment(@PathVariable("id") long id, @Valid @RequestBody CommentRequestDto commentRequestDto) {
        Comment updatedComment = commentService.updateComment(id, commentRequestDto);
        if (updatedComment != null) {
            return ResponseEntity.ok(updatedComment);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if comment not found
        }
    }
}
