package com.fitness.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "Mealplan")

public class Mealplan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "meal_tittle", nullable = false)
    private String mealTittle;

    @Column(name = "meal_image")
    private String mealImage;

    @Column(name = "ingredients")
    private String ingredients;

    @Column(name = "dietary")
    private String dietary;

    @Column(name = "recipe")
    private String recipe;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt = new Date();
    
}
