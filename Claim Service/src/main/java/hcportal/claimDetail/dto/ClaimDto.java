package hcportal.claimDetail.dto;

/**
 * @author biprajeet
 * 
 *         This is claimdetail dto class
 *
 */
public class ClaimDto {

	private int claimDetailId;

	private int employeeId;

	private Double requestedAmount;

	private Double paidAmount;

	private Double deniedAmount;

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
