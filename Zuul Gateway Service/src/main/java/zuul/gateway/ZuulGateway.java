package zuul.gateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

/**
 * @author Biprajeet
 * 
 *         This is zuul gateway class, to provide proxy for our rest services.
 *
 */
@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
public class ZuulGateway extends org.springframework.boot.web.servlet.support.SpringBootServletInitializer{
	
	private static Logger log = LoggerFactory.getLogger(ZuulGateway.class);
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(ZuulGateway.class);
	}
	

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		log.debug("Inside Zuul Gateway main... Zuul about to run");
		SpringApplication.run(ZuulGateway.class, args);

	}

	@Bean
	public SimpleFilter simpleFilter() {
		return new SimpleFilter();
	}

}
