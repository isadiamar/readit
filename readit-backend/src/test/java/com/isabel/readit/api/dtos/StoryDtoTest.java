package com.isabel.readit.api.dtos;

import com.isabel.readit.data.model.Genre;
import com.isabel.readit.data.model.Privacy;
import com.isabel.readit.data.model.Status;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;


class StoryDtoTest {

    @Test
    void testGetSetTitleAndDescription() {
        StoryDto storyDto = StoryDto.builder()
                .title("Title")
                .description("Description")
                .genre1(Genre.FANTASY)
                .genre2(Genre.HISTORICAL)
                .privacy(Privacy.PRIVATE)
                .status(Status.DROPPED)
                .build();

        assertEquals("Title", storyDto.getTitle());
        assertEquals("Description", storyDto.getDescription());

        storyDto.setTitle("DifferentTitle");
        storyDto.setDescription("DifferentDescription");

        assertEquals("DifferentTitle", storyDto.getTitle());
        assertEquals("DifferentDescription", storyDto.getDescription());
    }

    @Test
    void testGetSetGenreAndPrivacyAndStatus() {
        StoryDto storyDto = StoryDto.builder()
                .title("Title")
                .description("Description")
                .genre1(Genre.FANTASY)
                .genre2(Genre.HISTORICAL)
                .privacy(Privacy.PRIVATE)
                .status(Status.DROPPED)
                .build();

        assertEquals(Genre.FANTASY, storyDto.getGenre1());
        assertEquals(Status.DROPPED, storyDto.getStatus());
        assertEquals(Privacy.PRIVATE, storyDto.getPrivacy());

        storyDto.setGenre1(Genre.COMEDY);
        storyDto.setPrivacy(Privacy.PUBLIC);
        storyDto.setStatus(Status.COMPLETE);

        assertEquals(Genre.COMEDY, storyDto.getGenre1());
        assertEquals(Status.COMPLETE, storyDto.getStatus());
        assertEquals(Privacy.PUBLIC, storyDto.getPrivacy());
    }
}
