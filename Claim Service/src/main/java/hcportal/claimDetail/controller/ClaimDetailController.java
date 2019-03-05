package hcportal.claimDetail.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hcportal.claimDetail.dto.ClaimDto;
import hcportal.claimDetail.service.ClaimDetailService;

/**
 * @author biprajeet
 * 
 *         Claim detail controller class. All operations associated with claim
 *         rest services defined here
 *
 */
@CrossOrigin
@RestController
public class ClaimDetailController {
	private static Logger log = LoggerFactory.getLogger(ClaimDetailController.class);
	@Autowired
	private ClaimDetailService claimDetailService; // autowiring service class

	// Get operation to find claim details from its ID
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, value = "/claimDetail/{id}", produces = "application/json")
	public ClaimDto getClaimDetailById(@PathVariable("id") int claimDetailId) {
		return this.claimDetailService.getClaimDetailById(claimDetailId);
	}

	// Get operation to find list of claims associated with given member from
	// members ID
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, value = "/claimDetail/employee/{id}", produces = "application/json")
	public List<ClaimDto> getClaimDetailsByEmployeeId(@PathVariable("id") int employeeId) {
		try {
			return this.claimDetailService.getClaimDetailsByEmployeeId(employeeId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			log.error(e.getMessage());
		}
		return null;
	}

}
