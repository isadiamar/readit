package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.User;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserDto {
    @NotBlank
    private String id;
    @NotNull
    @NotBlank
    private String nickname;
    @NotNull
    @NotBlank
    private String email;
    private String password;
    private String description;

    public UserDto(User user) {
        BeanUtils.copyProperties(user, this);
    }

}
