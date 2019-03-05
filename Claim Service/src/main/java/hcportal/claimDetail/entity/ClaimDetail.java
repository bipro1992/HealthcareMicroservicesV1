package hcportal.claimDetail.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="claim_details")
public class ClaimDetail {
	
	@Id
	@Column(name="claim_detail_id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int claimDetailId;
	
	@Column(name="employee_id")
	private int employeeId;
	
	@Column(name="requested_amount")
	private Double requestedAmount;
	
	@Column(name="paid_amount")
	private Double paidAmount;
	
	@Column(name="denied_amount")
	private Double deniedAmount;
	
	@Column(name="adjudicated")
	private int adjudicated;

	public int getClaimDetailId() {
		return claimDetailId;
	}

	public void setClaimDetailId(int claimDetailId) {
		this.claimDetailId = claimDetailId;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public Double getRequestedAmount() {
		return requestedAmount;
	}

	public void setRequestedAmount(Double requestedAmount) {
		this.requestedAmount = requestedAmount;
	}

	public Double getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(Double paidAmount) {
		this.paidAmount = paidAmount;
	}

	public Double getDeniedAmount() {
		return deniedAmount;
	}

	public void setDeniedAmount(Double deniedAmount) {
		this.deniedAmount = deniedAmount;
	}

	public int getAdjudicated() {
		return adjudicated;
	}

	public void setAdjudicated(int adjudicated) {
		this.adjudicated = adjudicated;
	}

	

}
