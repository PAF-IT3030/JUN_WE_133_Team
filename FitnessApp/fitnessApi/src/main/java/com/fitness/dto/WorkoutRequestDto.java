package com.fitness.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkoutRequestDto {

    @Min(1)
    private int userId;

    @NotEmpty
    private String workoutType;

    @NotEmpty
    private String description;

    @NotEmpty
    private String measurs;

    // You can add more fields if needed

}
