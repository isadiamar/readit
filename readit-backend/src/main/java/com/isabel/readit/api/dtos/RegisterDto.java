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
public class RegisterDto {
    @NotNull
    @NotBlank
    private String nickname;
    @NotNull
    @NotBlank
    private String email;
    private String password;
    private String confirmPassword;

    public RegisterDto(User user) {
        BeanUtils.copyProperties(user, this);
    }

}


