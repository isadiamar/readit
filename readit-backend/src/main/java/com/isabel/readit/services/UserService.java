package com.isabel.readit.services;

import com.isabel.readit.api.dtos.UserDto;
import com.isabel.readit.data.model.User;
import com.isabel.readit.data.daos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User create(User user) {
        return this.userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(this.userRepository.findAll());
    }

    public UserDto getUserByEmail(String email) {
/*
        return this.userRepository
                .findByEmail(email)
                .map(user ->{
                    try{
                })
                .orElseThrow(() -> new NotFoundException("User email: " + email))
                .toUser();*/

        return new UserDto();
    }




}
