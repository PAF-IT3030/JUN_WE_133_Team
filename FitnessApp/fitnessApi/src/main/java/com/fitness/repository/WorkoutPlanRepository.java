package com.fitness.repository;

import com.fitness.entities.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {
    List<WorkoutPlan> findWorkoutPlanById(long mealId);
    List<WorkoutPlan> findAll();
}
