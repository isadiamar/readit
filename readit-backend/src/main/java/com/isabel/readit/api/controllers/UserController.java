package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.UserDto;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.UserService;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(UserController.USERS)
public class UserController {
    static final String USERS = "/api/private/user";
    static final String EMAIL = "/{email}";
    public static final String TOKEN = "/token";

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private JWTService jwtService;

    @GetMapping
    public List<UserDto> getAllUsers(){
        List<User>userEntityList = this.userService.getAllUsers();
        List<UserDto> userList = new ArrayList<>();

        for (User userEntity : userEntityList) {
            userList.add(new UserDto(userEntity));
        }
        return userList;
    }

    @GetMapping(EMAIL)
    public UserDto getUserByEmail(@PathVariable String email){
        return this.userService.getUserByEmail(email);
    }

    @GetMapping("/test")
    public String test() {
        return jwtService.getTokenEmailFromContext();
    }
}