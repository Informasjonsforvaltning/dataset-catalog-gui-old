package no.dcat.portal.webapp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.ClassPathResource;


/**
 * Created by nodavsko on 17.10.2016.
 */
@Configuration
@PropertySource("classpath:project.properties") // for maven build properties
@PropertySource("classpath:git.properties") // for git properties
@ConfigurationProperties(prefix = "application") // for application.yml
public class PortalConfiguration {

    private static String QUERY_SERVICE_SEARCH = "/search";
    private static String QUERY_SERVICE_DETAIL = "/detail";
    private static String QUERY_SERVICE_THEMES = "/themes";

    @Value("${spring.profiles.active:development}")
    private String profile;

    @Value("${application.queryService}")
    private String queryService;

    /* application.queryService */
    // private String queryService = "http://dcat.dummy.org";
    //TODO: fix. hvorfor settes ikke dette automatisk?
    //private String queryService = "http://fdk-pqr-fellesdatakatalog-ut1.ose-npc.brreg.no";

    public final void setQueryService(final String serviceURL) {

        this.queryService = serviceURL;
    }

    /**
     * Returns the URL to the query service.
     *
     * @return the query service URL string
     */
    public final  String getQueryService() {

        return this.queryService;
    }

    public final String getSearchServiceUrl() {
        return getQueryService() + QUERY_SERVICE_SEARCH;
    }

    public final String getThemeServiceUrl() {
        return getQueryService() + QUERY_SERVICE_THEMES;
    }

    public final String getDetailsServiceUrl() {
        return getQueryService() + QUERY_SERVICE_DETAIL;
    }

    /**
     * Provides a formated string that includes the version number of the current built application
     *
     * @return the version information string
     */
    public String getVersionInformation() {
        String versionInfo = artifactId + "-" + version + "/" + commitAbbrev +  "/" + buildDate + "/" + profile ;
        return versionInfo;
    }

    @Value("${git.commit.id.abbrev:gitcid}")
    private String commitAbbrev;

    @Value("${version:ver}")
    private String version;

    public final String getVersion() {
        return version;
    }

    @Value("${artifactId:aid}")
    private String artifactId = "artifactId";

    public final String getArtifactId() {

        return artifactId;
    }

    @Value("${build.date:1999-99-99}")
    private String buildDate;

    public final void setBuildDate(final String buildDateString) {

        buildDate = buildDateString;
    }

    public final String getBuildDate() {

        return buildDate;
    }

    //Det må lages en egen PropertySourcePlaceholderConfigurer siden @PropertySource fortsatt ikke støtter yaml format.
    @Bean
    @Profile("development") //Skal kun brukes når spring_active_profiles inneholder development
    public static PropertySourcesPlaceholderConfigurer properties() {
        PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        YamlPropertiesFactoryBean yaml = new YamlPropertiesFactoryBean();

        //Path til propertiesfiler som skal brukes for JUnit og kjøring på lokal maskin
        yaml.setResources(new ClassPathResource("properties/local-properties.yml"));

        propertySourcesPlaceholderConfigurer.setProperties(yaml.getObject());

        return propertySourcesPlaceholderConfigurer;
    }

}
