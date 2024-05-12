package com.fitness.servise;

import com.fitness.dto.PostRequestDto;
import com.fitness.entities.Post;
import java.util.List;

public interface PostService {
    Post savePost(PostRequestDto postRequestDto); //create posts
    List<Post> getAllPosts(); //get all posts
    void deletePostById(long id); //delete post
    Post updatePost(long id, PostRequestDto postRequestDto); //update post
}
