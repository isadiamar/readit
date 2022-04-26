package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.Genre;
import com.isabel.readit.data.model.Privacy;
import com.isabel.readit.data.model.Status;
import com.isabel.readit.data.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StoryDto {
    @NotBlank
    private String id;
    @NotBlank
    private String title;
    @NotBlank
    String description;
    List<Genre> genreList;
    private Status status;
    private Privacy privacy;
    private byte[] storyCover;
    private String color;
    private User user;


}
