package com.isabel.readit.services;

import com.isabel.readit.api.dtos.RegisterDto;
import com.isabel.readit.data.model.User;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.services.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User create(User user) {

        if (!Objects.equals(user.getPassword(), user.getConfirmPassword())){
            throw new BadRequestException("Password and confirm password should be the same");
        }else{
            return this.userRepository.save(user);
        }
    }


    public List<User> getAllUsers() {
        return new ArrayList<>(this.userRepository.findAll());
    }

    public RegisterDto getUserByEmail(String email) {
/*
        return this.userRepository
                .findByEmail(email)
                .map(user ->{
                    try{
                })
                .orElseThrow(() -> new NotFoundException("User email: " + email))
                .toUser();*/

        return new RegisterDto();
    }


}
