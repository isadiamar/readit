package com.isabel.readit.api.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LikeDto {
    private Integer id;
    private Integer numberLikes;
    private Integer storyId;
    private Integer userId;
}
