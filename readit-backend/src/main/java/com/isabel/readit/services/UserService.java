package com.isabel.readit.services;

import com.isabel.readit.data.UserEntity;
import com.isabel.readit.data.UserRepository;
import com.isabel.readit.rest.dtos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity create(UserEntity user) {
        return this.userRepository.save(user);
    }

    public List<UserEntity> getAllUsers() {
        return new ArrayList<>(this.userRepository.findAll());
    }
}
