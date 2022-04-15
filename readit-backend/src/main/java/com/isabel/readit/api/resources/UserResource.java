package com.isabel.readit.api.resources;

import com.isabel.readit.api.dtos.UserDto;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(UserResource.USERS)
public class UserResource {
    static final String USERS = "/users";
    static final String EMAIL = "/{email}";

    @Autowired
    UserService userService;

    @GetMapping("/hello")
    public String helloWorld() {
        return "hello";
    }


    @PostMapping()
    public UserDto create(@RequestBody UserDto userDto) {
        User user = User.builder()
                .nickname(userDto.getNickname())
                .email(userDto.getNickname())
                .password(userDto.getPassword())
                .build();

        return new UserDto(this.userService.create(user));
    }

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
}