package hcportal.claimDetail.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hcportal.claimDetail.entity.ClaimDetail;

/**
 * @author biprajeet
 *
 *         this is claim detail repository to provide JPA functionalities of
 *         spring boot
 *
 */
@Repository
public interface ClaimDetailRepository extends CrudRepository<ClaimDetail, Integer> {

	public List<ClaimDetail> findByEmployeeId(int employeeId);

}
