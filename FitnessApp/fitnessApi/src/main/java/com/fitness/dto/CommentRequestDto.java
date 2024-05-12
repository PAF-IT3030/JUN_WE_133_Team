package com.fitness.dto;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDto {

    @NotEmpty
    private String text;

    @NonNull
    private long postId;

    // You can add more fields if needed
}
