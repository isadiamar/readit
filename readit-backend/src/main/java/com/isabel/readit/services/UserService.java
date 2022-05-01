package com.isabel.readit.services;

import com.isabel.readit.api.dtos.RegisterDto;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.User;
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

    public List<User> getAllUsers() {
        return new ArrayList<>(this.userRepository.findAll());
    }

}
