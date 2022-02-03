package com.isabel.readit.rest.dtos;

import com.isabel.readit.data.UserEntity;
import org.springframework.beans.BeanUtils;

public class User {

    private Integer id;
    private String nickname;
    private String email;
    private String password;

    public User() {
        //empty for framework
    }


    public User(UserEntity userEntity) {
        BeanUtils.copyProperties(userEntity, this);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", nickname='" + nickname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}


