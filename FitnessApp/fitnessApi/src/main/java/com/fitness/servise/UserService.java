package com.fitness.servise;


import com.fitness.dto.UserRequestDto;
import com.fitness.entities.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(long id);
    User saveUser(UserRequestDto userRequestDto);
    User updateUser(long id, UserRequestDto userRequestDto);
    void deleteUser(long id); 
    boolean authenticateUser(String email, String password);

    Long authenticateAndGetUserId(String email, String password);
}
