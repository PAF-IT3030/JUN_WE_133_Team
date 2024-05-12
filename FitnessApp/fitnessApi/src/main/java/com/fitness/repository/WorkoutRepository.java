package com.fitness.repository;

import com.fitness.entities.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long>{
    List<Workout> findWorkoutById(long mealId);
    List<Workout> findAll();
}
