package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.Genre;
import com.isabel.readit.data.model.Privacy;
import com.isabel.readit.data.model.Status;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StoryDto {
    @NotBlank
    String description;
    private Integer id;
    @NotBlank
    private String title;
    private Genre genre1;
    private Genre genre2;
    private Status status;
    private Privacy privacy;
    private String cover;
    private String color;
    private String username;
}
