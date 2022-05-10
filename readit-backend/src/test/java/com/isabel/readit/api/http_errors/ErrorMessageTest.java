package com.isabel.readit.api.http_errors;

import com.isabel.readit.services.exceptions.NotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ErrorMessageTest {

    @Test
    void testGetErrorMessage(){
        NotFoundException exception = new NotFoundException("Not found");

        ErrorMessage error = new ErrorMessage(exception, HttpStatus.NOT_FOUND.value());

        assertEquals(NotFoundException.class.getSimpleName(), error.getError());
        assertEquals(exception.getMessage(), error.getMessage());
        assertEquals( HttpStatus.NOT_FOUND.value(), error.getCode());
    }

    @Test
    void testToStringErrorMessage(){

        NotFoundException exception = new NotFoundException("Not found");

        String message = "ErrorMessage(error=NotFoundException, message=Not Found Exception. Not found, code=404)";
        ErrorMessage error = new ErrorMessage(exception, HttpStatus.NOT_FOUND.value());
        assertEquals(message, error.toString());
    }
}
