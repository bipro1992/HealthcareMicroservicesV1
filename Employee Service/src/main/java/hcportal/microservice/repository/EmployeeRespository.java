package hcportal.microservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hcportal.microservice.entity.Employee;

@Repository
public interface EmployeeRespository extends CrudRepository<Employee,Integer>{
	
	public List<Employee> findByEmployerId(int employerId);
	
	@Query("select max(employeeId) from Employee")
	public int findMaxId();


}
