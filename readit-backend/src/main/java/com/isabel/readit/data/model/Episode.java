package com.isabel.readit.data.model;

import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.api.dtos.StoryDto;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "episodes")
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank
    @NotNull
    private String title;
    private LocalDate date;
    @Column(columnDefinition = "text")
    private String pdf;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "story_id", nullable = false)
    private Story story;
    private Integer numberEpisode;

    public EpisodeDto toEpisodeDto(){
        EpisodeDto episodeDto = new EpisodeDto();
        BeanUtils.copyProperties(this, episodeDto);
        if(Objects.nonNull(this.getStory())){
            episodeDto.setStoryId(this.getStory().getId());
        }
        return episodeDto;
    }
}
