package com.fitness.servise;

import com.fitness.dto.WorkoutPlanRequestDto;
import com.fitness.entities.WorkoutPlan;

import java.util.List;

public interface WorkoutPlanService {
    WorkoutPlan saveWorkoutPlan(WorkoutPlanRequestDto workoutPlanDto);

    List<WorkoutPlan> getAllWorkoutPlansByID(long id);

    void deleteWorkoutPlanById(long id);
    WorkoutPlan updateWorkoutPlan(long id, WorkoutPlanRequestDto workoutPlanDto);

    List<WorkoutPlan> getAllWorkoutPlans();
}
