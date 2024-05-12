package com.fitness.servise;

import com.fitness.dto.MealRequestDto;
import com.fitness.entities.Mealplan;

import java.util.List;

public interface MealService {

    Mealplan saveMeal(MealRequestDto mealRequestDto);

    List<Mealplan> getAllMealsByID(long id);

    void deleteMealById(long id);
    Mealplan updateMeal(long id, MealRequestDto mealRequestDto);

    List<Mealplan> getAllMeals();


}
