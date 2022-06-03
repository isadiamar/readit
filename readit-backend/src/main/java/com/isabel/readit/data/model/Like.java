package com.isabel.readit.data.model;

import com.isabel.readit.api.dtos.CommentDto;
import com.isabel.readit.api.dtos.EpisodeDto;
import com.isabel.readit.api.dtos.LikeDto;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer numberLikes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "story_id", nullable = false)
    private Story story;

    public LikeDto toLikeDto() {
        LikeDto likeDto = new LikeDto();
        BeanUtils.copyProperties(this, likeDto);
        if (Objects.nonNull(this.getUser()) && Objects.nonNull(this.getStory())) {
            likeDto.setUserId(this.getUser().getId());
            likeDto.setStoryId(this.getStory().getId());
        }
        if (Objects.nonNull(this.getUser())){
            likeDto.setUserId(this.getUser().getId());
        }
        if(Objects.nonNull(this.getStory())){
            likeDto.setStoryId(this.getStory().getId());
        }
        return likeDto;
    }
}
