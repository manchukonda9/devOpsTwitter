# NuTweets

  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
    Getting Started
      <ul>
        <li><a href="#single-command-deployement-using-terraform-automation">Single command Deployement using Terraform (Automation)</a></li>
      </ul>
      <li><a href="http://a6154b83af0b6465f9cc9d0466d66abb-1177565989.us-west-2.elb.amazonaws.com/">Website Link(already deployed)</a></li>
    </li>
    <li><a href="#monitoring">Monitoring</a></li>
    <li><a href="#horizontal-pod-scaling">Horizontal Pod Scaling</a></li>
    <li><a href="#frontend">FrontEnd</a></li>
    <li><a href="#backend">BackEnd</a></li>
  <li><a href="#light-house-report">Light House Report</a></li>
  </ol>

# About the Project
User can signup and login into application<br />
User can view, tweet, edit and delete the tweets<br />
User is able to search for tweets using keywords<br />
Users are restricted from posting any offensive tweets<br />
User information such as Login credentials, tweets are stored in MongoDb<br />
Application is deployed in AWS using kubernetes and terraform(automation)<br />
Monitered using Prometheus and Grafana<br />
Application uses terrform for automation<br />
Horizantal Pod Autoscaling is done<br />
Progressive web application

# Single command Deployement using Terraform (Automation)
Pre-requisites
1. Install Terraform 
2. Install Kubectl 
3. Configure aws credentials and provide with correct access policies
4. Install aws-iam-authenticator so that kubeconfig can be easily done

### Bring up eks on aws
  ```
  $ git clone github.com/manchukonda9/devOpsTwitter.git
  $ cd automation
  $ terraform init
  $ terraform plan
  $ terraform apply # when provided prompt click on yes
  ```
### Configure kubectl
```   $  aws eks --region $(terraform output region) update-kubeconfig --name $(terraform output cluster_name) ```
OR enter the command ``` terraform output kubeconfig ``` and copy the output and paste it in the .kube/config file in your machine
```kubectl cluster-info``` enter this command to verify the cluster is up and running

### Deploy pods to the Cluster
```
  kubectl create -f cloudl-server-service.yml 
  kubectl create -f cloudl-server-deployment.yml 
  kubectl create -f cloudl-redis-service.yml 
  kubectl create -f cloudl-redis-deployment.yml 
  kubectl create -f cloudl-client-service.yml 
  kubectl create -f cloudl-client-deployment.yml
  ```
### Horizontal Pod Scaling
```
  kubectl create -f hpa.yml
  kubectl create -f hpa-demo-deployment.yml
  
  kubectl get svc
  ```
  
  ```
  Then u will get the ip address:
  NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)          AGE
cloudl-client-service   LoadBalancer   172.20.127.215   a82fad4d0f5f94db4bb46e29072aae0a-1101398906.us-west-2.elb.amazonaws.com   80:30213/TCP     35s

  Copy and paste the EXTERNAL-IP of the load balancer in your browser and the application is ready to use
  ```
  
  ### Monitoring
  To monitor the deployment:
  
  Grafana:
  ``` 
  cd monitoring/Grafana
  docker run --rm -p 3000:3000 \
  -e GF_AUTH_DISABLE_LOGIN_FORM=true \
  -e GF_AUTH_ANONYMOUS_ENABLED=true \
  -e GF_AUTH_ANONYMOUS_ORG_ROLE=Admin \
  -v `pwd`/datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml \
  grafana/grafana:7.1.5
  
  ```
  Prometheus:
  cd monitoring/prometheus
  
  ```
  docker build -t my-prometheus
  docker run -p 9090:9090 my-prometheus
  
  ```
  
  
  ### Exiting
  After finishing the delete all the pods and service with the command:
  ```
  kubectl delete daemonsets,replicasets,services,deployments,pods,rc --all
  
  ```
  And destroy the EKS resources on aws using :
  ```
  terraform destroy 
  
   ```
   
   # FrontEnd
   Go to the frontend folder:
   ```
   cd client
   npm install
   npm start 
   npm eject(after done)
   ```
   # BackEnd
   Go to the backend folder:
   ```
   cd server
   npm install
   npm start 
   npm eject(after done)
   ```
   # DockerCompose
   Go to the Project folder
   ```
   docker-compose build
   docker-compose up
   ```
   # Light house report
   Open the light house report pdf to check the performance and accessibility of the website.<br />
   It recorded an excellent performance of 86 and accessibility of 95. 
   
   
  
  
