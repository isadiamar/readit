package com.isabel.readit.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.isabel.readit.data.model.User;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.services.UserService;
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
public class UserResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;


    @BeforeEach
    void setUp()
    {
        List<User> userList = new ArrayList<>();

        User user1 = User.builder().nickname("Laura").email("laura@email.com").password("laurapassword").build();
        User user2 =User.builder().nickname("Pepe").email("pepe@email.com").password("pepepassword").build();
        User user3 = User.builder().nickname("Mia").email("mia@email.com").password("miapassword").build();
        User user4 = User.builder().nickname("Lolo").email("lolo@email.com").password("lolopassword").build();

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
/*
    @Test
    void testCreate() throws Exception {
        User user1 = User.builder().nickname("Laura").email("laura@email.com").password("laurapassword").build();
        Mockito.when(userService.create(any(User.class))).thenReturn(user1);

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
        mockMvc.perform(get("api/private/user")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn().getResponse();

    }

    @Test
    void testGetUserByEmail() throws Exception {
        User user1 = User.builder().nickname("Laura").email("laura@email.com").password("laurapassword").build();

        mockMvc.perform(get("/users/{email}", user1.getEmail()))
                .andExpect(status().isOk()).andReturn();
    }
*/
}
