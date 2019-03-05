
create table employerdb.employer_detail
(

employer_id int unique not null,
employer_name varchar(20) not null,
election_amount double not null

);



insert into employerdb.employer_detail values(4001,'ABC Company',2600.00);
insert into employerdb.employer_detail values(4002,'XYZ Company',1600.00);
insert into employerdb.employer_detail values(4003,'AWS Company',5000.00);

create table employeedb.employee(

employee_id int unique not null,
employer_id int not null,
first_name varchar(45) not null,
last_name varchar(45) not null,
address_1 varchar(100) not null,
address_2 varchar(50)

);

insert into employeedb.employee values(1001,4001,'John','Doe','Diagon-Alley',null);
insert into employeedb.employee values(1002,4001,'Peter','Parker','Queens','NY');
insert into employeedb.employee values(1003,4001,'Harry','Potter','Hogwartz',null);
insert into employeedb.employee values(1004,4002,'Tony','Stark','Knowhere',null);
insert into employeedb.employee values(1005,4002,'Steve','Rogers','Brooklyn',null);
insert into employeedb.employee values(1006,4003,'Miles','Morales','NY',null);

create table claimdetaildb.claim_details(

claim_detail_id  int unique not null,
employee_id int not null,
requested_amount double not null,
paid_amount double,
denied_amount double,
adjudicated int default 0
);

insert into claimdetaildb.claim_details values(5001,1001,100.00,100.00,0.00,1);
insert into claimdetaildb.claim_details values(5002,1001,1200.00,100.00,1100.00,1);
insert into claimdetaildb.claim_details values(5003,1001,10.00,10.00,10.00,1);
insert into claimdetaildb.claim_details values(5004,1001,150.00,0.00,0.00,0);
insert into claimdetaildb.claim_details values(5005,1002,1000.00,0.00,1000.00,1);
insert into claimdetaildb.claim_details values(5006,1002,105.00,105.00,0.00,1);
insert into claimdetaildb.claim_details values(5007,1002,100.00,100.00,0.00,1);
insert into claimdetaildb.claim_details values(5008,1002,200.00,100.00,100.00,1);
insert into claimdetaildb.claim_details values(5009,1003,500.00,0.00,0.00,0);
insert into claimdetaildb.claim_details values(5010,1004,400.00,100.00,300.00,1);
insert into claimdetaildb.claim_details values(5011,1004,100.00,100.00,0.00,1);
insert into claimdetaildb.claim_details values(5012,1006,100.00,100.00,0.00,1);