package com.isabel.readit.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.isabel.readit.data.UserEntity;
import com.isabel.readit.data.UserRepository;
import com.isabel.readit.rest.dtos.User;
import com.isabel.readit.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.BDDMockito.given;


@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;


    @BeforeEach
    void setUp()
    {
        List<UserEntity> userList = new ArrayList<UserEntity>();

        UserEntity user1 = new UserEntity("Laura", "laura@email.com", "laurapassword");
        UserEntity user2 = new UserEntity("Pepe", "pepe@email.com", "pepepassword");
        UserEntity user3 = new UserEntity("Ramón", "ramos@email.com", "ramospassword");
        UserEntity user4 = new UserEntity("Sofía", "sofia@email.com", "sorapassword");

        userList.add(user1);
        userList.add(user2);
        userList.add(user3);
        userList.add(user4);

        given(this.userService.getAllUsers()).willReturn(userList);
        given(this.userService.create(user1)).willReturn(user1);

    }

    //Utils
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void testCreate() throws Exception {
        UserEntity userEntity = new UserEntity("Laura", "laura@email.com", "laurapassword");
        Mockito.when(userService.create(any(UserEntity.class))).thenReturn(userEntity);

        Map<String, Object> body = new HashMap<>();
        body.put("nickname", "aa");
        body.put("email", "email@test.com");
        body.put("password", "aa");

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(body)))
                .andExpect(status().isOk());
    }

    @Test
    void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/users")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn().getResponse();



    }

}
