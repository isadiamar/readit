package com.isabel.readit.data.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


import javax.persistence.*;
import java.util.List;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique=true)
    private String nickname;
    @Column(unique=true)
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String description;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Story> storyList;

    public void addStoryToList(Story story){
        storyList.add(story);
    }

    public void removeStoryFromList(Story story){
        storyList.remove(story);
    }
}
