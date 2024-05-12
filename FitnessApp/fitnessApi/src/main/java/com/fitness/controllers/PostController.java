package com.fitness.controllers;


import com.fitness.dto.PostRequestDto;
import com.fitness.entities.Post;
import com.fitness.servise.PostService;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor

public class PostController {

    @NonNull
    private  final PostService postService;

    @PostMapping //create post
    public ResponseEntity<Post> savePost(@Valid @RequestBody PostRequestDto postRequestDto) {
        return ResponseEntity.ok(postService.savePost(postRequestDto));
    }

    @GetMapping //get all posts
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/{id}") //delete posts
    public ResponseEntity<String> deletePost(@PathVariable("id") long id) {
        postService.deletePostById(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") long id, @Valid @RequestBody PostRequestDto postRequestDto) {
        Post updatedPost = postService.updatePost(id, postRequestDto);
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if post not found
        }
    }
}
