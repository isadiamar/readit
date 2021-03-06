package com.isabel.readit.data.model;

import com.isabel.readit.api.dtos.StoryDto;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stories")
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank
    @NotNull
    private String title;
    @NotBlank
    @NotNull
    @Column(length = 1000)
    private String description;
    private Genre genre1;
    private Genre genre2;
    private Status status;
    private Privacy privacy;
    @Column(columnDefinition = "text")
    private String cover;
    private String color;

    @OneToMany(mappedBy = "story", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Episode> episodeList;

    @OneToMany(mappedBy = "story", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Like> likeList;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public StoryDto toStoryDto() {
        StoryDto storyDto = new StoryDto();
        BeanUtils.copyProperties(this, storyDto);
        if (Objects.nonNull(this.getUser())) {
            storyDto.setUsername(this.getUser().getNickname());
            storyDto.setUserId(this.getUser().getId());
        }
        if (Objects.nonNull(this.getLikeList())) {
            storyDto.setNumberLikes(this.getLikeList().size());
        }
        return storyDto;
    }

}
