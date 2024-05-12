package com.fitness.servise.impl;

import com.fitness.dto.WorkoutPlanRequestDto;
import com.fitness.entities.WorkoutPlan;
import com.fitness.repository.WorkoutPlanRepository;
import com.fitness.servise.WorkoutPlanService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class WorkoutPlanServiceImpl implements WorkoutPlanService {

    private final WorkoutPlanRepository workoutPlanRepository;

    public WorkoutPlanServiceImpl(WorkoutPlanRepository workoutPlanRepository) {
        this.workoutPlanRepository = workoutPlanRepository;
    }

    @Override
    public WorkoutPlan saveWorkoutPlan(WorkoutPlanRequestDto workoutPlanRequestDto) {
        WorkoutPlan workoutPlan = new WorkoutPlan();
        workoutPlan.setUserId(workoutPlanRequestDto.getUserId());
        workoutPlan.setTitle(workoutPlanRequestDto.getTitle());
        workoutPlan.setDescription(workoutPlanRequestDto.getDescription());
        workoutPlan.setExname(workoutPlanRequestDto.getExname());
        workoutPlan.setSets(workoutPlanRequestDto.getSets());
        workoutPlan.setRepetitions(workoutPlanRequestDto.getRepetitions());
        workoutPlan.setCreatedAt(new Date());
        workoutPlan.setUpdatedAt(new Date());

        return workoutPlanRepository.save(workoutPlan);
    }

    @Override
    public List<WorkoutPlan> getAllWorkoutPlansByID(long workoutPlanId) {
        List<WorkoutPlan> workoutPlans = workoutPlanRepository.findWorkoutPlanById(workoutPlanId);
        return workoutPlans;
    }

    @Override
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    @Override
    public void deleteWorkoutPlanById(long id) {
        workoutPlanRepository.deleteById(id);
    }

    @Override
    public WorkoutPlan updateWorkoutPlan(long id, WorkoutPlanRequestDto workoutPlanRequestDto) {
        Optional<WorkoutPlan> workoutPlanOptional = workoutPlanRepository.findById(id);
        if (workoutPlanOptional.isPresent()) {
            WorkoutPlan workoutPlan = workoutPlanOptional.get();
            workoutPlan.setUserId(workoutPlanRequestDto.getUserId());
            workoutPlan.setTitle(workoutPlanRequestDto.getTitle());
            workoutPlan.setDescription(workoutPlanRequestDto.getDescription());
            workoutPlan.setExname(workoutPlanRequestDto.getExname());
            workoutPlan.setSets(workoutPlanRequestDto.getSets());
            workoutPlan.setRepetitions(workoutPlanRequestDto.getRepetitions());
            workoutPlan.setUpdatedAt(new Date());
            return workoutPlanRepository.save(workoutPlan);
        }
        return null;
    }
}
