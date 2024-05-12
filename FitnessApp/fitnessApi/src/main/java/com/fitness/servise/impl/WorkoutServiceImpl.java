package com.fitness.servise.impl;

import com.fitness.dto.WorkoutRequestDto;
import com.fitness.entities.Workout;
import com.fitness.repository.WorkoutRepository;
import com.fitness.servise.WorkoutService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;

    public WorkoutServiceImpl(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Override
    public Workout saveWorkout(WorkoutRequestDto workoutRequestDto) {
        Workout workout = new Workout();
        workout.setWorkoutType(workoutRequestDto.getWorkoutType());
        workout.setUserId(workoutRequestDto.getUserId());
        workout.setDescription(workoutRequestDto.getDescription());
        workout.setMeasurs(workoutRequestDto.getMeasurs());
        workout.setCreatedAt(new Date());
        workout.setUpdatedAt(new Date());

        return workoutRepository.save(workout);
    }

    @Override
    public List<Workout> getAllWorkoutsByID(long workoutId) {
        List<Workout> workouts = workoutRepository.findWorkoutById(workoutId);
        return workouts;
    }

    @Override
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    @Override
    public void deleteWorkoutById(long id) {
        workoutRepository.deleteById(id);
    }

    @Override
    public Workout updateWorkout(long id, WorkoutRequestDto workoutRequestDto) {
        Optional<Workout> workoutOptional = workoutRepository.findById(id);
        if (workoutOptional.isPresent()) {
            Workout workout = workoutOptional.get();
            workout.setWorkoutType(workoutRequestDto.getWorkoutType());
            workout.setUserId(workoutRequestDto.getUserId());
            workout.setDescription(workoutRequestDto.getDescription());
            workout.setMeasurs(workoutRequestDto.getMeasurs());
            workout.setUpdatedAt(new Date());
            return workoutRepository.save(workout);
        }
        return null;
    }

}
