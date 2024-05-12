package com.fitness.servise.impl;

import com.fitness.dto.PostRequestDto;
import com.fitness.entities.Post;
import com.fitness.repository.PostRepository;
import com.fitness.servise.PostService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    @NonNull
    private final PostRepository postRepository;

    @Override //create post
    public Post savePost(PostRequestDto postRequestDto) {
        Post mappedPost = postRequestDtoToPost(postRequestDto);
        return postRepository.save(mappedPost);
    }

    @Override //get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override //delete post
    public void deletePostById(long id) {
        postRepository.deleteById((int) id);
    }

    @Override //update post
    public Post updatePost(long id, PostRequestDto postRequestDto) {
        Optional<Post> optionalPost = postRepository.findById((int) id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setTitle(postRequestDto.getTitle());
            post.setImageUrls(String.valueOf(postRequestDto.getImageUrls()));
            post.setCaption(postRequestDto.getCaption());
            return postRepository.save(post);
        } else {
            // Handle post not found case, you can throw an exception or return null
            return null;
        }
    }

    private Post postRequestDtoToPost(PostRequestDto postRequestDto) {
        Post post = new Post();
              post.setTitle(postRequestDto.getTitle());
              post.setImageUrls(String.valueOf(postRequestDto.getImageUrls()));
              post.setCaption(postRequestDto.getCaption());

        return post;
    }
}
