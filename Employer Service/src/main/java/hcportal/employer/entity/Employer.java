package hcportal.employer.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="employer_detail")
public class Employer {
	
	@Id
	@Column(name="employer_id")
	private int employerId;
	
	@Column(name="employer_name")
	private String employerName;
	
	@Column(name="election_amount")
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
