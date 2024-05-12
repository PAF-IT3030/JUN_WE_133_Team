package com.fitness.controllers;

import com.fitness.dto.WorkoutPlanRequestDto;
import com.fitness.entities.WorkoutPlan;
import com.fitness.servise.WorkoutPlanService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/workoutplan")
public class WorkoutPlanController {

        private final WorkoutPlanService workoutPlanService;

        public WorkoutPlanController(WorkoutPlanService workoutPlanService) {
            this.workoutPlanService = workoutPlanService;
        }

        @PostMapping
        public ResponseEntity<WorkoutPlan> saveWorkoutPlan(@RequestBody WorkoutPlanRequestDto workoutPlanRequestDto) {
            return ResponseEntity.ok(workoutPlanService.saveWorkoutPlan(workoutPlanRequestDto));
        }

        @GetMapping("{workoutPlanId}")
        public ResponseEntity<List<WorkoutPlan>> getAllWorkoutPlansByID(@PathVariable("workoutPlanId") long workoutPlanId) {
            List<WorkoutPlan> workoutPlans = workoutPlanService.getAllWorkoutPlansByID(workoutPlanId);
            return ResponseEntity.ok(workoutPlans);
        }

        @GetMapping("/workoutplans")
        public ResponseEntity<List<WorkoutPlan>> getAllWorkoutPlans() {
            List<WorkoutPlan> workoutPlans = workoutPlanService.getAllWorkoutPlans();
            return ResponseEntity.ok(workoutPlans);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteWorkoutPlan(@PathVariable("id") long id) {
            workoutPlanService.deleteWorkoutPlanById(id);
            return ResponseEntity.ok("Deleted successfully");
        }

        @PutMapping("/{id}")
        public ResponseEntity<WorkoutPlan> updateWorkoutPlan(@PathVariable("id") long id, @RequestBody WorkoutPlanRequestDto workoutPlanRequestDto) {
            WorkoutPlan updatedWorkoutPlan = workoutPlanService.updateWorkoutPlan(id, workoutPlanRequestDto);
            if (updatedWorkoutPlan != null) {
                return ResponseEntity.ok(updatedWorkoutPlan);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
}
