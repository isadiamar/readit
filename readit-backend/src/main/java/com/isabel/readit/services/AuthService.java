package com.isabel.readit.services;

import com.isabel.readit.api.dtos.LoginDto;
import com.isabel.readit.api.dtos.TokenDto;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.exceptions.BadRequestException;
import com.isabel.readit.services.exceptions.ForbiddenException;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JWTService jwtService;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public TokenDto register(User user) {
        TokenDto res = new TokenDto();

        if(!Objects.equals(user.getPassword(), user.getConfirmPassword()) || userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new BadRequestException("Invalid data input");
        }else {
            String encodedPass = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPass);
            user = userRepository.save(user);
            res.setToken(jwtService.jwtCreateToken(user.getEmail()));
        }
        return res;
    }

    public TokenDto login(LoginDto loginDto) {
        TokenDto res = new TokenDto();

        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow(() -> new ForbiddenException("Email or password are wrong"));

        if(!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new ForbiddenException("Email or password are wrong");
        }

        res.setToken(jwtService.jwtCreateToken(user.getEmail()));

        return res;
    }
}
