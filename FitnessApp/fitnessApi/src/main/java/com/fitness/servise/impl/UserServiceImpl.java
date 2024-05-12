package com.fitness.servise.impl;

import com.fitness.dto.UserRequestDto;
import com.fitness.entities.User;
import com.fitness.repository.UserRepository;
import com.fitness.servise.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @NonNull
    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(long id) {
        Optional<User> userOptional = userRepository.findById((int) id);
        return userOptional.orElse(null);
    }



    @Override
    public User saveUser(UserRequestDto userRequestDto) {
        User mappedUser = userRequestDtoToUser(userRequestDto);
        return userRepository.save(mappedUser);
    }

    @Override
    public User updateUser(long id, UserRequestDto userRequestDto) {
        Optional<User> optionalUser = userRepository.findById((int) id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUsername(userRequestDto.getUsername());
            existingUser.setEmail(userRequestDto.getEmail());
            existingUser.setProfilePicture(userRequestDto.getProfilePicture());
            existingUser.setBio(userRequestDto.getBio());
            existingUser.setPassword(userRequestDto.getPassword());
            return userRepository.save(existingUser);
        }
        return null;
    }

    

    @Override
    public void deleteUser(long id) {
        userRepository.deleteById((int) id);
    }

    private User userRequestDtoToUser(UserRequestDto userRequestDto) {
        User user = new User();
        user.setUsername(userRequestDto.getUsername());
        user.setEmail(userRequestDto.getEmail());
        user.setProfilePicture(userRequestDto.getProfilePicture());
        user.setBio(userRequestDto.getBio());
        user.setPassword(userRequestDto.getPassword());
        return user;
    }

    @Override
    public boolean authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    @Override
    public Long authenticateAndGetUserId(String email, String password) {
        User user = userRepository.findByEmail(email);
        return (user != null && user.getPassword().equals(password)) ? user.getId() : null;
    }
}
