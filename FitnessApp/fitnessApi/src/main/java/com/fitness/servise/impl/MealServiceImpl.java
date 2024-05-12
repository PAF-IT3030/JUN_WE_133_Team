package com.fitness.servise.impl;

import com.fitness.dto.MealRequestDto;

import com.fitness.entities.Mealplan;
import com.fitness.repository.MealRepository;
import com.fitness.servise.MealService;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MealServiceImpl implements MealService{

    private final MealRepository mealRepository;

    public MealServiceImpl(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    @Override
    public Mealplan saveMeal(MealRequestDto mealRequestDto) {
        Mealplan meal = new Mealplan();
        meal.setMealTittle(mealRequestDto.getMealTittle());
        meal.setMealImage(mealRequestDto.getMealImage());
        meal.setDietary(mealRequestDto.getDietary());
        meal.setIngredients(mealRequestDto.getIngredients());
        meal.setRecipe(mealRequestDto.getRecipe());
        meal.setUserId(mealRequestDto.getUserId());
        meal.setCreatedAt(new Date());
        meal.setUpdatedAt(new Date());

        return mealRepository.save(meal);
    }


    @Override
    public List<Mealplan> getAllMealsByID(long mealId) {
        List<Mealplan> mealplans = mealRepository.findMealplanById(mealId);
        return mealplans;
    }

    @Override
    public List<Mealplan> getAllMeals() {
        return mealRepository.findAll();
    }




    @Override
    public void deleteMealById(long id) {
        mealRepository.deleteById(id);
    }

    @Override
    public Mealplan updateMeal(long id, MealRequestDto mealRequestDto) {
        Optional<Mealplan> optionalMealplan = mealRepository.findById(id);
        if (optionalMealplan.isPresent()) {
            Mealplan mealplan = optionalMealplan.get();
            mealplan.setMealTittle(mealRequestDto.getMealTittle());
            mealplan.setMealImage(mealRequestDto.getMealImage());
            mealplan.setDietary(mealRequestDto.getDietary());
            mealplan.setIngredients(mealRequestDto.getIngredients());
            mealplan.setRecipe(mealRequestDto.getRecipe());
            mealplan.setUpdatedAt(new Date());
            return mealRepository.save(mealplan);
        } else {
            return null;
        }
    }
}
