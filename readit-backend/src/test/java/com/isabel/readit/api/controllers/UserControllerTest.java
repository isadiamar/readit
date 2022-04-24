package com.isabel.readit.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.isabel.readit.data.model.User;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.services.UserService;
import com.isabel.readit.services.security.JWTService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.BDDMockito.given;


@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JWTService jwtService;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;



    //Utils
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @Test
    void testGetAllUsers() throws Exception {
        mockMvc.perform(get("api/private/user")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn().getResponse();

    }

    @Test
    void testGetUserByEmail() throws Exception {

        mockMvc.perform(get("api/private/user/{email}", "c1@email.com"))
                .andExpect(status().isOk()).andReturn();
    }

}
