# How to run this application

1) First add Eureka Service Maven application.

    - Endpoint for Eureka server in AWS Elastic Beanstalk: http://hc-eureka-server.ap-south-1.elasticbeanstalk.com

2) After adding Eureka server app, add Zuul Gateway service. Zuul gateway will provide proxy for our other services

    - Endpoint for Zuul Gateway in AWS Elastic Beanstalk: http://hc-gateway.ap-south-1.elasticbeanstalk.com

3) After adding Zuul proxy service, Employer service is added. Employer service will provide GET,PUT operations.
    - Enpoint for Employer Service:
      
      a) Without Zuul proxy (Not to be used while routing) : http://hc-employer-service.ap-south-1.elasticbeanstalk.com/
      
      b) With Zuul proxy (Recomended): http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/employerOps/**
      
    - Service url provided by Employer: 
    
        a) GET operation, to get employer details: http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/employerOps/employer/{id} , 
           where {id} is employer id.
        
        b) PUT operation, to update employer details: http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/employerOps/employer/{id} , 
        with body input as :
                {
                  electionAmount:123
                }

4) Add Employee Service. It will provide GET,POST operations.

     - Enpoint for Employee Service:
     
       a) Without Zuul proxy (Not to be used while routing) : http://hc-employee-service.ap-south-1.elasticbeanstalk.com/
      
       b) With Zuul proxy (Recomended): http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/employeeOps/**
     
     - Service url provided by Employee: 
     
       a) GET operation, to get list of employee for given employer: http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/employeeOps/employee/employer/{id},
          where {id} is employer id.
          
          To get employee details from employee id: http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/employeeOps/employee/{id},
          where {id} is employee id.
          
       b) POST operation. to add employee: http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/employeeOps/employee
          body input sample:
          
          {

              "employerId":1234,
              "firstName": "john",
              "lastName":"Doe",
              "address1":"Test addr"
          }
 
 5) Add Claim Service. It will provide GET operation:
 
      - Enpoint for Claim Service:
     
         a) Without Zuul proxy (Not to be used while routing) : http://hc-claim-service.ap-south-1.elasticbeanstalk.com/

         b) With Zuul proxy (Recomended): http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/claimOps/**
     
     - Service url provided by Claim Service: 
     
        To get list of claims for given employee: http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/claimOps/claimDetail/employee/{id},
        where {id} is employee Id

       To get claim detail from claim id: http://hc-gateway.ap-south-1.elasticbeanstalk.com/healthcare/v1/claimOps/claimDetail/{id},
        where {id} is claim Id
        
After adding services, run them as per above sequence and test the service operations from above provided URLs. 
