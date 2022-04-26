package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
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
