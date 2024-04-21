package com.PAF.rest.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String workout_name;

    @Column
    private String description;

    @Column
    private String exercise_name;

    @Column
    private String sets;

    @Column
    private String repetition;

    @Column
    private String fitness_goals;

   

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getWorkout_name() {
        return workout_name;
    }
    public void setWorkout_name(String workout_name) {
        this.workout_name = workout_name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getExercise_name() {
        return exercise_name;
    }
    public void setExercise_name(String exercise_name) {
        this.exercise_name = exercise_name;
    }
    public String getSets() {
        return sets;
    }
    public void setSets(String sets) {
        this.sets = sets;
    }
    public String getRepetition() {
        return repetition;
    }
    public void setRepetition(String repetition) {
        this.repetition = repetition;
    }

    public String getFitness_goals() {
        return fitness_goals;
    }
    public void setFitness_goals(String fitness_goals) {
        this.fitness_goals = fitness_goals;
    }
    

}
