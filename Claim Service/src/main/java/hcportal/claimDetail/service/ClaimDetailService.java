package hcportal.claimDetail.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;

import hcportal.claimDetail.dto.ClaimDto;
import hcportal.claimDetail.entity.ClaimDetail;
import hcportal.claimDetail.repository.ClaimDetailRepository;

/**
 * @author biprajeet
 * 
 *         This is claim detail service class providing rest services like
 *         finding claimdetail by its ID or finding list of claims for given
 *         employee Id
 * 
 *         This service class is demonstrating fallback functionality of Hystrix
 *         i.e circuit breaker and caching .
 *
 */
@Service
public class ClaimDetailService {

	private static Logger log = LoggerFactory.getLogger(ClaimDetailService.class);
	@Autowired
	private ClaimDetailRepository repository;

	// To find claim detail from claim detail id. Also caching the retrived
	// object

	@SuppressWarnings("unused")
	@Cacheable("claimDetailById")
	public ClaimDto getClaimDetailById(Integer claimDetail) {
		try {

			ClaimDetail detail = this.repository.findById(claimDetail).get();
			
			System.out.println(detail.getRequestedAmount());
			
			System.out.println(detail.getAdjudicated());

			if (detail != null) {
				ClaimDto dto = new ClaimDto();
				dto.setClaimDetailId(detail.getClaimDetailId());
				dto.setAdjudicated(detail.getAdjudicated());
				dto.setDeniedAmount(detail.getDeniedAmount());
				dto.setEmployeeId(detail.getEmployeeId());
				dto.setPaidAmount(detail.getPaidAmount());
				dto.setRequestedAmount(detail.getRequestedAmount());

				return dto;
			}

		} catch (Exception e) {
			log.error(e.getMessage());
			return null;
		}
		return null;
	}

	// To find list of claim details associated with given member from member Id
	@HystrixCommand(fallbackMethod = "getClaimDetailsByEmployeeIdFallback", commandProperties = {
			@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "180000") })

	public List<ClaimDto> getClaimDetailsByEmployeeId(int employeeId) {

		List<ClaimDetail> claimDetails = new ArrayList<ClaimDetail>();
		List<ClaimDto> dtos = new ArrayList<ClaimDto>();

		claimDetails = this.repository.findByEmployeeId(employeeId);

		for (ClaimDetail detail : claimDetails) {

			ClaimDto dto = new ClaimDto();
			dto.setClaimDetailId(detail.getClaimDetailId());
			dto.setAdjudicated(detail.getAdjudicated());
			dto.setDeniedAmount(detail.getDeniedAmount());
			dto.setEmployeeId(detail.getEmployeeId());
			dto.setPaidAmount(detail.getPaidAmount());
			dto.setRequestedAmount(detail.getRequestedAmount());

			dtos.add(dto);

		}

		return dtos;

	}

	// Fallback method for claim details
	public List<ClaimDto> getClaimDetailsByEmployeeIdFallback(int employeeId) {
		log.info("inside getClaimDetailsByEmployeeIdFallback");
		List<ClaimDto> claimDetails = new ArrayList<ClaimDto>();
		return claimDetails;
	}

}
