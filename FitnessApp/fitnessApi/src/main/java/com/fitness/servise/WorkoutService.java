package com.fitness.servise;

import com.fitness.dto.WorkoutRequestDto;
import com.fitness.entities.Workout;

import java.util.List;


public interface WorkoutService {
    Workout saveWorkout(WorkoutRequestDto workoutRequestDto);

    List<Workout> getAllWorkoutsByID(long id);

    void deleteWorkoutById(long id);
    Workout updateWorkout(long id, WorkoutRequestDto workoutRequestDto);

    List<Workout> getAllWorkouts();
}
