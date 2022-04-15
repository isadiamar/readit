package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserDto {

    private Integer id;
    private String nickname;
    private String email;
    private String password;


    public UserDto(User user) {
        BeanUtils.copyProperties(user, this);
    }


}


