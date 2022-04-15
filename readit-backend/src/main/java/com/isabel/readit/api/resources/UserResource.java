package com.isabel.readit.api.resources;

import com.isabel.readit.api.dtos.TokenDto;
import com.isabel.readit.api.dtos.UserDto;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(UserResource.USERS)
public class UserResource {
    static final String USERS = "/users";
    static final String EMAIL = "/{email}";
    public static final String TOKEN = "/token";

    private final UserService userService;

    @Autowired
    public UserResource(UserService userService) {
        this.userService = userService;
    }


    @PostMapping()
    public UserDto register(@RequestBody UserDto userDto) {
        User user = User.builder()
                .nickname(userDto.getNickname())
                .email(userDto.getNickname())
                .password(userDto.getPassword())
                .confirmPassword(userDto.getConfirmPassword())
                .build();

        return new UserDto(this.userService.create(user));
    }

    @SecurityRequirement(name = "basicAuth")
    @PreAuthorize("authenticated")
    @PostMapping(value = TOKEN)
    public Optional<TokenDto> login(@AuthenticationPrincipal User activeUser) {
        return userService.login(activeUser.getEmail())
                .map(TokenDto::new);
    }


    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/hello")
    public String helloWorld() {
        return "hello";
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