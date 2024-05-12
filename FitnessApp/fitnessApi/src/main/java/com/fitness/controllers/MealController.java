package com.fitness.controllers;

import com.fitness.dto.MealRequestDto;
import com.fitness.entities.Mealplan;
import com.fitness.servise.MealService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/meal")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }


    @PostMapping // Create meal
    public ResponseEntity<Mealplan> saveMeal(@Valid @RequestBody MealRequestDto mealRequestDto) {
        return ResponseEntity.ok(mealService.saveMeal(mealRequestDto));
    }

    @GetMapping("{mealId}") // Get meals by user id
    public ResponseEntity<List<Mealplan>> getAllMealsByID(@PathVariable("mealId") long mealId) {
        List<Mealplan> mealplans = mealService.getAllMealsByID(mealId);
        return ResponseEntity.ok(mealplans);
    }

    @GetMapping("/meals") // Get all meals
    public ResponseEntity<List<Mealplan>> getAllMeals() {
        List<Mealplan> meals = mealService.getAllMeals();
        return ResponseEntity.ok(meals);
    }


    @DeleteMapping("/{id}") // Delete meal
    public ResponseEntity<String> deleteMeal(@PathVariable("id") long id) {
        mealService.deleteMealById(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PutMapping("/{id}") // Update meal
    public ResponseEntity<Mealplan> updateMeal(@PathVariable("id") long id, @Valid @RequestBody MealRequestDto mealRequestDto) {
        Mealplan updatedMeal = mealService.updateMeal(id, mealRequestDto);
        if (updatedMeal != null) {
            return ResponseEntity.ok(updatedMeal);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if meal not found
        }
    }
    
}
