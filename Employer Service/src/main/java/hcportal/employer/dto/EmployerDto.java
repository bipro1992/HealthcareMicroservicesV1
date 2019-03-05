package hcportal.employer.dto;

public class EmployerDto {

	private int employerId;
	private String employerName;
	private Double electionAmount;

	public int getEmployerId() {
		return employerId;
	}

	public void setEmployerId(int employerId) {
		this.employerId = employerId;
	}

	public String getEmployerName() {
		return employerName;
	}

	public void setEmployerName(String employerName) {
		this.employerName = employerName;
	}

	public Double getElectionAmount() {
		return electionAmount;
	}

	public void setElectionAmount(Double electionAmount) {
		this.electionAmount = electionAmount;
	}

}
