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
public class EpisodeDto {
    private Integer id;
    @NotBlank
    private String title;
    private LocalDate date;
    @NotBlank
    private String pdf;
    @NotNull
    private Integer storyId;
    private Integer numberEpisode;
}
