package com.isabel.readit.data.model;

import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

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
    private String title;
    private String description;
    private Genre genre1;
    private Genre genre2;
    private Status status;
    private Privacy privacy;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] storyCover;
    private String color;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
