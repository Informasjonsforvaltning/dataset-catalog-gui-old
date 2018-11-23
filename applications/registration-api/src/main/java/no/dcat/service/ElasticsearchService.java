package no.dcat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import no.dcat.client.elasticsearch5.Elasticsearch5Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ElasticsearchService {

    private ElasticsearchTemplate elasticsearchTemplate;
    private Elasticsearch5Client elasticClient;
    private ObjectMapper mapper;

    @Autowired
    ElasticsearchService(ElasticsearchTemplate elasticsearchTemplate, ObjectMapper mapper) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.mapper = mapper;
        elasticClient = new Elasticsearch5Client(elasticsearchTemplate.getClient());

        try {
            elasticClient.registerMapping("reg-api", "api",
                mapper.readTree(new ClassPathResource("api-mappings.json").getInputStream()).get("api").toString());
            elasticClient.initializeAliasAndIndexMapping("reg-api");
        } catch (IOException e) {
            throw new RuntimeException("Unable to intialize elasticsearch index", e);
        }
    }

}