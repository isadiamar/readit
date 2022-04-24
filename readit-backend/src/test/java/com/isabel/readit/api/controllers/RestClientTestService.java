package com.isabel.readit.api.controllers;

import com.isabel.readit.api.dtos.LoginDto;
import com.isabel.readit.api.dtos.TokenDto;
import com.isabel.readit.services.security.JWTService;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.test.web.reactive.server.WebTestClient;

@Service
public class RestClientTestService {

//    @Autowired
//    private JWTService jwtService;
//
//    @Autowired
//    private WebTestClient webTestClient;
//
//    private String token;


//    public void login(String email, String password, WebTestClient webTestClient) {
//        TokenDto tokenDto = webTestClient
//                .post().uri(AuthController.AUTH + "/login")
//                .body(LoginDto.builder().email(email).password(password).build(), LoginDto.class)
//                .exchange()
//                .expectStatus().isOk()
//                .expectBody(TokenDto.class)
//                .value(Assertions::assertNotNull)
//                .returnResult().getResponseBody();
//        if (tokenDto != null) {
//            this.token = tokenDto.getToken();
//        }
//    }

    public String getToken() {
        return "";
    }

}
