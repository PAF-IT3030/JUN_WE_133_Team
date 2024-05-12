package com.fitness.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkoutPlanRequestDto {

        @Min(1)
        private int userId;

        @NotEmpty
        private String title;

        private String description;

        @NotEmpty
        private String exname;

        @NotEmpty
        private int sets;

        @NotEmpty
        private int repetitions;


}
