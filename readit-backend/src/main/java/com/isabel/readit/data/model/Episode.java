package com.isabel.readit.data.model;

import com.isabel.readit.api.dtos.EpisodeDto;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Builder
@Getter
@Setter
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

    @OneToMany(mappedBy = "episode", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comment> commentList;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "story_id", nullable = false)
    private Story story;
    private Integer numberEpisode;


    public EpisodeDto toEpisodeDto() {
        EpisodeDto episodeDto = new EpisodeDto();
        BeanUtils.copyProperties(this, episodeDto);
        if (Objects.nonNull(this.getStory())) {
            episodeDto.setStoryId(this.getStory().getId());
            episodeDto.setUserId(this.getStory().getUser().getId());
        }
        return episodeDto;
    }
}
