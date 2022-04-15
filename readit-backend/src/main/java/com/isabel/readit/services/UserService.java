package com.isabel.readit.services;

import com.isabel.readit.api.dtos.UserDto;
import com.isabel.readit.data.model.User;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.services.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Autowired
    public UserService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public User create(User user) {

        if (!Objects.equals(user.getPassword(), user.getConfirmPassword())){
            throw new BadRequestException("Password and confirm password should be the same");
        }else{
            return this.userRepository.save(user);
        }
    }

    public Optional<String> login(String email) {
        return this.userRepository.findByEmail(email)
                .map(user -> jwtService.createToken(user.getEmail(), user.getNickname()));
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
