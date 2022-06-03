package com.isabel.readit.data.model;

import com.isabel.readit.api.dtos.CommentDto;
import com.isabel.readit.api.dtos.EpisodeDto;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.Objects;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank
    @Column(columnDefinition = "text")
    private String description;

    private LocalDate date;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "episode_id", nullable = false)
    private Episode episode;

    public CommentDto toCommentDto() {
        CommentDto commentDto = new CommentDto();
        BeanUtils.copyProperties(this, commentDto);
        if (Objects.nonNull(this.getUser()) && Objects.nonNull(this.getEpisode())) {
            commentDto.setUsername(this.getUser().getNickname());
            commentDto.setEpisodeId(this.getEpisode().getId());
        }
        if (Objects.nonNull(this.getUser())){
            commentDto.setUsername(this.getUser().getNickname());
        }
        if(Objects.nonNull(this.getEpisode())){
            commentDto.setEpisodeId(this.getEpisode().getId());
        }
        return commentDto;
    }
}
