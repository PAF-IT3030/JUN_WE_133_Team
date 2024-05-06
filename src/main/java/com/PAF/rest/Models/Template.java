package com.PAF.rest.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String type_ofActivity;

    @Column
    private String duration;

    @Column
    private String intensity;

    @Column
    private String intervals;

    @Column
    private String equipmentAvailability;

   

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getWorkout_name() {
        return type_ofActivity;
    }
    public void setWorkout_name(String type_ofActivity) {
        this.type_ofActivity = type_ofActivity;
    }
    public String getDescription() {
        return duration;
    }
    public void setDescription(String duration) {
        this.duration = duration;
    }
    public String getExercise_name() {
        return intensity;
    }
    public void setExercise_name(String intensity) {
        this.intensity = intensity;
    }
    public String getSets() {
        return intervals;
    }
    public void setSets(String intervals) {
        this.intervals = intervals;
    }
    public String getRepetition() {
        return equipmentAvailability;
    }
    public void setRepetition(String equipmentAvailability) {
        this.equipmentAvailability = equipmentAvailability;
    }
    

}
