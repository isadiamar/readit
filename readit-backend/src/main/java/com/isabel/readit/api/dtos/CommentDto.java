package com.isabel.readit.api.dtos;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDto {
    private Integer id;
    @NotBlank
    private String description;
    private LocalDate date;
    @NotNull
    private Integer episodeId;
    @NotBlank
    private String username;
    private Integer userId;
}
