package com.fitness.servise.impl;

import com.fitness.dto.CommentRequestDto;
import com.fitness.entities.Comment;
import com.fitness.repository.CommentRepository;
import com.fitness.servise.CommentService;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment saveComment(CommentRequestDto commentRequestDto) {
        Comment comment = new Comment();
        comment.setText(commentRequestDto.getText());
        comment.setPostId(commentRequestDto.getPostId());
        comment.setCreatedAt(new Date());
        comment.setUpdatedAt(new Date());
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsByPostId(long postId) {
        // Call the repository method to find all comments by post ID
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments;
    }
    

    @Override
    public void deleteCommentById(long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public Comment updateComment(long id, CommentRequestDto commentRequestDto) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            comment.setText(commentRequestDto.getText());
            comment.setUpdatedAt(new Date());
            return commentRepository.save(comment);
        } else {
            return null;
        }
    }
}
