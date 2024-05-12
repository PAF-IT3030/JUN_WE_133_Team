package com.fitness.repository;

import com.fitness.entities.Mealplan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MealRepository extends JpaRepository<Mealplan, Long>{
    List<Mealplan> findMealplanById(long mealId);
    List<Mealplan> findAll();


}
