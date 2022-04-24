package com.isabel.readit.data.daos;

import com.isabel.readit.data.model.User;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Arrays;

@Repository
public class UserSeederDev {

    @Autowired
    private UserRepository userRepository;

    public void deleteAllAndInitializeAndSeedDataBase() {
        this.deleteAll();
        this.seedDataBase();
    }

    public void deleteAll() {
        this.userRepository.deleteAll();
        LogManager.getLogger(this.getClass()).warn("------- Deleted All -----------");
    }

    private void seedDataBase(){
        LogManager.getLogger(this.getClass()).warn("------- Initial Load from JAVA -----------");
        User[] users = {
                User.builder().nickname("c1").email("c1@email.com").password("Pxrb234").confirmPassword("Pxrb234").description("xxxx").build(),
                User.builder().nickname("c2").email("c2@email.com").password("XxrbG683").confirmPassword("XxrbG683").build(),
                User.builder().nickname("c3").email("c3@email.com").password("*FGR573").confirmPassword("*FGR573").description("cccc").build(),
                User.builder().nickname("c4").email("c4@email.com").password("qjXVp6&e").confirmPassword("qjXVp6&e").description("aaaa").build(),
                User.builder().nickname("c5").email("c5@email.com").password("Pxrebsd4").confirmPassword("Pxrebsd4").description("vvvv").build(),
        };
        this.userRepository.saveAll(Arrays.asList(users));
        LogManager.getLogger(this.getClass()).warn("        ------- users");
    }
}
