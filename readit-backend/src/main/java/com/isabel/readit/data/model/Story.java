package com.isabel.readit.data.model;

import com.isabel.readit.api.dtos.StoryDto;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.File;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stories")
public class Story{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank
    @NotNull
    private String title;
    @NotBlank
    @NotNull
    private String description;
    private Genre genre1;
    private Genre genre2;
    private Status status;
    private Privacy privacy;
    private File storyCover;
    private String color;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public StoryDto toStoryDto(){
        StoryDto storyDto = new StoryDto();
        BeanUtils.copyProperties(this, storyDto);
        return storyDto;
    }

}
