package com.fitness.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Setter
@Getter
public class GroupRequestDto {

        @NonNull
        private String title;


        private String imageUrl;

        @NonNull
        private String caption;





}
