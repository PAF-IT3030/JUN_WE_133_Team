package com.PAF.rest.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.PAF.rest.Models.User;
import com.PAF.rest.Models.Template;

import com.PAF.rest.Repo.UserRepo;
import com.PAF.rest.Repo.TemplateRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin("*")

@RestController
public class ApiControllers {

    @Autowired
    private UserRepo userRepo;

    @GetMapping(value = "/")
    public String getPage() {
        return "Welcome";
    }

    @GetMapping(value = "/users")
    public List<User> getUsers(){
        return userRepo.findAll();
    }

    @PostMapping(value = "/save")
    public String saveUser(@RequestBody User user){
        userRepo.save(user);
        return "Saved...";
    }

    @PutMapping(value = "/update/{id}")
    public String updateUser(@PathVariable long id, @RequestBody User user) {
        User updatedUser = userRepo.findById(id).get();
        updatedUser.setWorkout_name(user.getWorkout_name());
        updatedUser.setDescription(user.getDescription());
        updatedUser.setSets(user.getSets());
        updatedUser.setExercise_name(user.getExercise_name());
        updatedUser.setRepetition(user.getRepetition());
        updatedUser.setFitness_goals(user.getFitness_goals());
        userRepo.save(updatedUser);
        return "Updated";
        
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteUser(@PathVariable long id){
        User deleteUser = userRepo.findById(id).get();
        userRepo.delete(deleteUser);
        return "Deleted :"+id;
    }

    @Autowired
    private TemplateRepo templateRepo;

    @GetMapping(value = "/templist")
    public String getTempList() {
        return "Welcome";
    }

    @GetMapping(value = "/temps")
    public List<Template> getTemps(){
        return templateRepo.findAll();
    }

    @PostMapping(value = "/savetemps")
    public String saveTemp(@RequestBody Template template){
        templateRepo.saveTemps(template);
        return "Saved Template...";
    }

    @PutMapping(value = "/updateTem/{id}")
    public String updateTemplate(@PathVariable long id, @RequestBody Template template) {
        Template updatedTemplate = templateRepo.findById(id).get();
        updatedTemplate.setType_of_activity(template.getType_of_activity());
        updatedTemplate.setDuration(template.getDuration());
        updatedTemplate.setIntensity(template.getIntensity());
        updatedTemplate.setIntervals(template.getIntervals());
        updatedTemplate.setEquipment_Availability(template.getEquipment_Availability());
        
        templateRepo.save(updatedTemplate);
        return "Updated Yours";
        
    }

}
