package hcportal.microservice.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hcportal.microservice.dto.EmployeeDto;
import hcportal.microservice.entity.Employee;
import hcportal.microservice.service.EmployeeService;

/**
 * @author biprajeet
 * 
 *         This is employee rest controller class
 *
 */

@CrossOrigin
@RestController
public class EmployeeController {

	private static Logger log = LoggerFactory.getLogger(EmployeeController.class);

	@Autowired
	private EmployeeService service; // autowiring employee service

	// GET operation to fetch member details from member Id

	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, value = "/employee/{id}", produces = "application/json")
	public EmployeeDto getEmployee(@PathVariable("id") int employeeId) {
		log.debug("getEmployee under EmployeeController being processed");
		return this.service.getEmployeeById(employeeId);
	}

	// Get operation to fetch list of members for given employer id
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, value = "/employee/employer/{id}", produces = "application/json")
	public List<EmployeeDto> getEmployeesByEmployerId(@PathVariable("id") int employerId) {
		log.debug("getEmployeesByEmployerId under EmployeeController being processed");
		return this.service.getEmployeesByEmployerId(employerId);
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, value = "/employee", consumes = "application/json", produces = "application/json")
	public Employee addEmployee(@RequestBody Employee employee) {
		log.debug("addEmployee under EmployeeController being processed");
		return this.service.addEmployee(employee);
	}

}
