package com.PAF.rest.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.PAF.rest.Models.User;
import com.PAF.rest.Repo.UserRepo;
// import com.google.protobuf.compiler.PluginProtos.CodeGeneratorResponse.File;

// import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

// import java.io.InputStream;
// import java.nio.file.*;
// import java.nio.file.Paths;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin("*")
@RestController
public class ApiControllers {

    @Autowired
    private UserRepo userRepo;

    

    @GetMapping(value = "/users")
    public List<User> getUsers(){
        return userRepo.findAll();
    }

    @PostMapping(value = "/save")
    public String saveUser(@RequestBody User user){
        
        userRepo.save(user);
        // String image = user.getImageFileName();

        // try{
        //     String uploadDir ="public/image/";
        //     Path uploadpath = Paths.get(uploadDir);
            
        //     if (!Files.exists(uploadpath)){
        //         Files.createDirectories(uploadpath);
        //     }
        //     try (InputStream inputStream =image.getInputStream()){

        //     }
        // }

        
        
        
        return "Post added....";
    }

    @PutMapping(value = "/update/{id}")
    public String updateUser(@PathVariable long id, @RequestBody User user) {
        User updatedUser = userRepo.findById(id).get();
        updatedUser.setFitness_act(user.getFitness_act());
        updatedUser.setWorkouts(user.getWorkouts());
        updatedUser.setMeals(user.getMeals());
        updatedUser.setProgress(user.getProgress());
        
        userRepo.save(updatedUser);
        return "Updated";
        
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteUser(@PathVariable long id){
        User deleteUser = userRepo.findById(id).get();
        userRepo.delete(deleteUser);
        return "Deleted :"+id;
    }
}
