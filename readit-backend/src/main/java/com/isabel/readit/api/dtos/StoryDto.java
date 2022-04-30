package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.Genre;
import com.isabel.readit.data.model.Privacy;
import com.isabel.readit.data.model.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.io.File;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StoryDto {
    private Integer id;
    @NotBlank
    private String title;
    @NotBlank
    String description;
    private Genre genre1;
    private Genre genre2;
    private Status status;
    private Privacy privacy;
    private File storyCover;
    private String color;
}
