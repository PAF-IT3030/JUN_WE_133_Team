package com.fitness.servise;

import com.fitness.dto.CommentRequestDto;
import com.fitness.entities.Comment;

import java.util.List;

public interface CommentService {
    Comment saveComment(CommentRequestDto commentRequestDto);
    List<Comment> getCommentsByPostId(long postId);
    void deleteCommentById(long id);
    Comment updateComment(long id, CommentRequestDto commentRequestDto);
}
