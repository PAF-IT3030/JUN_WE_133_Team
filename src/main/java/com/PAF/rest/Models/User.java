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
    private String fitness_act;

    @Column
    private String workouts;

    @Column
    private String meals;

    @Column
    private String progress;

    @Column
    private String imagefileName;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getFitness_act() {
        return fitness_act;
    }
    public void setFitness_act(String fitness_act) {
        this.fitness_act = fitness_act;
    }
    public String getWorkouts() {
        return workouts;
    }
    public void setWorkouts(String workouts) {
        this.workouts = workouts;
    }
    public String getMeals() {
        return meals;
    }
    public void setMeals(String meals) {
        this.meals = meals;
    }
    public String getProgress() {
        return progress;
    }
    public void setProgress(String progress) {
        this.progress = progress;
    }

    public String getImageFileName(){
        return imagefileName;
    }
    
    public void setImageFileName(String imagefileName ){
        this.imagefileName = imagefileName;
    }


}
