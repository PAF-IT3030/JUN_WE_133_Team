package com.fitness.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class PostRequestDto {

        @NonNull
        private String title;


        private List<String> imageUrls;

        @NonNull
        private String caption;

}
