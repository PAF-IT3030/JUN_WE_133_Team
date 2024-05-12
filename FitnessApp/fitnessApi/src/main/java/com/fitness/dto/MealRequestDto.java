package com.fitness.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MealRequestDto {

    @Min(1)
    private int userId;

    @NotEmpty
    private String mealTittle;

    @NotEmpty
    private String mealImage;

    @NotEmpty
    private String ingredients;

    @NotEmpty
    private String dietary;

    @NotEmpty
    private String recipe;

    



    // You can add more fields if needed
    
}
