package com.isabel.readit.services;

import com.isabel.readit.api.dtos.StoryDto;
import com.isabel.readit.data.daos.StoryRepository;
import com.isabel.readit.data.daos.UserRepository;
import com.isabel.readit.data.model.Story;
import com.isabel.readit.data.model.User;
import com.isabel.readit.services.exceptions.ForbiddenException;
import com.isabel.readit.services.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class StoryService {
    private StoryRepository storyRepository;
    private UserRepository userRepository;

    @Autowired
    public StoryService(UserRepository userRepository, StoryRepository storyRepository) {
        this.userRepository = userRepository;
        this.storyRepository = storyRepository;
    }

    public StoryDto create(StoryDto storyDto, String email) {
        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new ForbiddenException("User not found"));
        Story story = Story.builder()
                .title(storyDto.getTitle())
                .description(storyDto.getDescription())
                .genre1(storyDto.getGenre1())
                .genre2(storyDto.getGenre2())
                .privacy(storyDto.getPrivacy())
                .status(storyDto.getStatus())
                .color(storyDto.getColor())
                .storyCover(storyDto.getStoryCover())
                .user(user)
                .build();
        this.storyRepository.save(story);
        storyDto.setId(story.getId());
        return storyDto;
    }
    // compress the image bytes before storing it in the database

    public static byte[] compressBytes ( byte[] data){

        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {}
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();

    }

    // uncompress the image bytes before returning it to the angular application

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException ignored) {
        }
        return outputStream.toByteArray();
    }

}
