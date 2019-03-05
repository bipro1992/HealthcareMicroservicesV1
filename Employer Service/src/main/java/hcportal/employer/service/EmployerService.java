package hcportal.employer.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;

import hcportal.employer.dto.EmployerDto;
import hcportal.employer.entity.Employer;
import hcportal.employer.repository.EmployerRepository;

/**
 * @author biprajeet
 * 
 *         This is service class for employer rest service.
 *
 */
@Service
public class EmployerService {

	private static Logger log = LoggerFactory.getLogger(EmployerService.class);

	@Autowired
	private EmployerRepository repository;

	
	
	public Employer addEmployer(Employer employer) {
		int id=this.repository.findMaxId()+1;
		employer.setEmployerId(id);
		return this.repository.save(employer);
	}

	// To find employer details from its ID
	@CachePut("getEmployerById")
	public EmployerDto getEmployerById(int employerId) {
		try {

			log.debug("getEmployerById under Employer service started processing");
			Employer employer = this.repository.findById(employerId).get();

			if (employer != null) {

				EmployerDto dto = new EmployerDto();
				dto.setEmployerId(employer.getEmployerId());
				dto.setElectionAmount(employer.getElectionAmount());
				dto.setEmployerName(employer.getEmployerName());

				return dto;
			}

		} catch (Exception e) {
			log.error(e.getMessage());
			return null;
		}

		return null;

	}

	// To update employer details for given employer
	@CachePut("updateEmployer")
	public Employer updateEmployer(int employerId, Employer employer) {
		try {
			log.debug("updateEmployer under Employer service started processing");
			Employer employerNew = this.repository.findById(employerId).get();

			if (employer != null) {

				employerNew.setElectionAmount(employer.getElectionAmount());
				return this.repository.save(employerNew);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			return null;

		}

		return null;
	}

}
