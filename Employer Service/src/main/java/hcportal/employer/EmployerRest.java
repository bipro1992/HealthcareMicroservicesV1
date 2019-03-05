package hcportal.employer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * @author biprajeet
 * 
 * 
 *         This is Employer rest class
 * 
 * 
 *
 */
@EnableJpaRepositories(basePackages = "hcportal.employer.repository")
@SpringBootApplication
@EnableCaching
@EnableDiscoveryClient
public class EmployerRest extends org.springframework.boot.web.servlet.support.SpringBootServletInitializer{
	
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(EmployerRest.class);
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		SpringApplication.run(EmployerRest.class, args);

	}

}
