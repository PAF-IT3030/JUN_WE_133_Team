package com.PAF.rest.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PAF.rest.Models.User;

public interface UserRepo extends JpaRepository<User, Long> {

}
