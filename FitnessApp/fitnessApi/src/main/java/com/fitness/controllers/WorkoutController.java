package com.fitness.controllers;

import com.fitness.dto.WorkoutRequestDto;
import com.fitness.entities.Workout;
import com.fitness.servise.WorkoutService;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/workout")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping
    public ResponseEntity<Workout> saveWorkout(@Valid @RequestBody WorkoutRequestDto workoutRequestDto) {
        return ResponseEntity.ok(workoutService.saveWorkout(workoutRequestDto));
    }

    @GetMapping("{workoutId}")
    public ResponseEntity<List<Workout>> getAllWorkoutsByID(@PathVariable("workoutId") long workoutId) {
        List<Workout> workouts = workoutService.getAllWorkoutsByID(workoutId);
        return ResponseEntity.ok(workouts);
    }

    @GetMapping("/workouts")
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        List<Workout> workouts = workoutService.getAllWorkouts();
        return ResponseEntity.ok(workouts);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkout(@PathVariable("id") long id) {
        workoutService.deleteWorkoutById(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable("id") long id, @Valid @RequestBody WorkoutRequestDto workoutRequestDto) {
        Workout updatedWorkout = workoutService.updateWorkout(id, workoutRequestDto);
        if (updatedWorkout != null) {
            return ResponseEntity.ok(updatedWorkout);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
