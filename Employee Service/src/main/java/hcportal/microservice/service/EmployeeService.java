package hcportal.microservice.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;

import hcportal.microservice.dto.EmployeeDto;
import hcportal.microservice.dto.Employer;
import hcportal.microservice.entity.Employee;
import hcportal.microservice.repository.EmployeeRespository;

@Service
public class EmployeeService {

	private static Logger log = LoggerFactory.getLogger(EmployeeService.class);

	@Autowired
	private EmployeeRespository respository;

	@Autowired
	private RestTemplate restTemplate;

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@HystrixCommand(fallbackMethod = "addEmployeeFallback", commandProperties = {
			@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "180000") })

	public Employee addEmployee(Employee employee) {

		String restUrl = "http://hc-zuul-gateway-service.us-east-2.elasticbeanstalk.com/healthcare/v1/employerOps/employer/"
				+ employee.getEmployerId();

		Employer employer = restTemplate.getForObject(restUrl, Employer.class);

		if (employer == null) {
			return null;
		}

		if (employee.getFirstName() != null && employee.getFirstName().length() > 0 && employee.getLastName() != null
				&& employee.getLastName().length() > 0 && employee.getAddress1() != null
				&& employee.getAddress1().length() > 0) {
			int id = this.respository.findMaxId() + 1;
			employee.setEmployeeId(id);
			return this.respository.save(employee);
		}

		return null;
	}

	@Cacheable("EmployeeId")
	public EmployeeDto getEmployeeById(int employeeId) {
		try {
			log.debug("getEmployeeById process under EmployeeService is starting");
			Employee employee = this.respository.findById(employeeId).get();
			if (employee != null) {
				EmployeeDto dto = new EmployeeDto();
				dto.setEmployeeId(employee.getEmployeeId());
				dto.setEmployerId(employee.getEmployerId());
				dto.setFirstName(employee.getFirstName());
				dto.setLastName(employee.getLastName());
				dto.setAddress1(employee.getAddress1());
				dto.setAddress2(employee.getAddress2());

				return dto;
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			return null;
		}
		return null;
	}

	@HystrixCommand(fallbackMethod = "getEmployeesByEmployerIdFallback", commandProperties = {
			@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "180000") })

	public List<EmployeeDto> getEmployeesByEmployerId(int employerId) {

		List<Employee> employeeList = new ArrayList<Employee>();
		List<EmployeeDto> dtos = new ArrayList<EmployeeDto>();

		employeeList = this.respository.findByEmployerId(employerId);

		for (Employee emp : employeeList) {

			EmployeeDto dto = new EmployeeDto();
			dto.setEmployeeId(emp.getEmployeeId());
			dto.setEmployerId(emp.getEmployerId());
			dto.setFirstName(emp.getFirstName());
			dto.setLastName(emp.getLastName());
			dto.setAddress1(emp.getAddress1());
			dto.setAddress2(emp.getAddress2());

			dtos.add(dto);

		}

		return dtos;

	}

	// Fallback method for claim details
	public List<EmployeeDto> getEmployeesByEmployerIdFallback(int employerId) {
		log.info("inside getClaimDetailsByEmployeeIdFallback");
		return null;
	}

	public Employee addEmployeeFallback(Employee employee) {
		log.info("addEmployeeFallback called");
		return null;
	}
}
