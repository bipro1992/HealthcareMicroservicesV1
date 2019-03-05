package test.eureka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class HCEurekaServer extends org.springframework.boot.web.servlet.support.SpringBootServletInitializer{
	
	private static Logger log = LoggerFactory.getLogger(HCEurekaServer.class);
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(HCEurekaServer.class);
	}
	
	

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		log.debug("Eureka server starting");
		SpringApplication.run(HCEurekaServer.class, args);


	}

}
