package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.User;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserDto {
    private Integer id;
    private String nickname;
    private String description;

    public UserDto(User user) {
        BeanUtils.copyProperties(user, this);
    }

}
