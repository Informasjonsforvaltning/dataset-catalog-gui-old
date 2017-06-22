package no.dcat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;


@SpringBootApplication
@EnableElasticsearchRepositories
//@EnableSAMLSSO
public class RegisterApplication {


    public static void main(String... args) {
        SpringApplication.run(RegisterApplication.class, args);
    }

}

