package com.isabel.readit.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.isabel.readit.data.UserEntity;
import com.isabel.readit.data.UserRepository;
import com.isabel.readit.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @Test
    void testCreate() throws Exception {
        UserEntity userEntity = new UserEntity("Laura", "laura@email.com", "laurapassword");
        Mockito.when(userService.create(any(UserEntity.class))).thenReturn(userEntity);

        Map<String,Object> body = new HashMap<>();
        body.put("nickname","aa");
        body.put("email","email@test.com");
        body.put("password","aa");

        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(body)))
                .andExpect(status().isOk());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
