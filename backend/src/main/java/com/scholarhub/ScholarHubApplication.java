package com.scholarhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableCaching
@EnableAsync
public class ScholarHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(ScholarHubApplication.class, args);
    }
}
