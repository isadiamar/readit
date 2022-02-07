package com.isabel.readit.rest;

import com.isabel.readit.data.UserEntity;
import com.isabel.readit.rest.dtos.User;
import com.isabel.readit.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController{
    static final String USERS = "/users";
    
    @Autowired
    UserService userService;

    @GetMapping("/hello")
    public String helloWorld() {
        return "hello";
    }


    @PostMapping()
    public User create(@RequestBody User user) {
        UserEntity userEntity = new UserEntity(
                user.getNickname(),
                user.getEmail(),
                user.getPassword()
        );

        return new User(this.userService.create(userEntity));
    }


}