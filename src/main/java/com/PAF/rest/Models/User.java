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
    private String lastname;

    @Column
    private int age;

    @Column
    private String occupation;

    @Column
    private String meal;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getWorkout_Name() {
        return workout_name;
    }
    public void setWorkout_Name(String workout_name) {
        this.workout_name = workout_name;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getOccupation() {
        return occupation;
    }
    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }
    


}
