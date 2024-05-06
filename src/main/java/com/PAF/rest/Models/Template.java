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
    public String getType_of_activity() {
        return type_ofActivity;
    }
    public void setType_of_activity(String type_ofActivity) {
        this.type_ofActivity = type_ofActivity;
    }
    public String getDuration() {
        return duration;
    }
    public void setDuration(String duration) {
        this.duration = duration;
    }
    public String getIntensity() {
        return intensity;
    }
    public void setIntensity(String intensity) {
        this.intensity = intensity;
    }
    public String getIntervals() {
        return intervals;
    }
    public void setIntervals(String intervals) {
        this.intervals = intervals;
    }
    public String getEquipment_Availability() {
        return equipmentAvailability;
    }
    public void setEquipment_Availability(String equipmentAvailability) {
        this.equipmentAvailability = equipmentAvailability;
    }
    

}
