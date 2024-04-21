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
    private String meals;

    @Column
    private String recipes;

    @Column
    private int potion;

    @Column
    private String info;

   

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getMeals() {
        return meals;
    }
    public void setMeals(String meals) {
        this.meals = meals;
    }
    public String getRecipes() {
        return recipes;
    }
    public void setRecipes(String recipes) {
        this.recipes = recipes;
    }
    public int getPotion() {
        return potion;
    }
    public void setPotion(int potion) {
        this.potion = potion;
    }
    public String getInfo() {
        return info;
    }
    public void setInfo(String info) {
        this.info = info;
    }
    


}
