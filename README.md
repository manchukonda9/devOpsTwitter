# devOpsTwitter
# Single command Deployement using Terraform (Automation)
Pre-requisites
1. Install Terraform 
2. Install Kubectl 
3. Configure aws credentials and provide with correct access policies
4. Install aws-iam-authenticator so that kubeconfig can be easily done

# Bring up eks on aws
  ```
  $ git clone github.com/manchukonda9/devOpsTwitter.git
  $ cd automation
  $ terraform init
  $ terraform plan
  $ terraform apply # when provided prompt click on yes
  ```
# Configure kubectl
```   $  aws eks --region $(terraform output region) update-kubeconfig --name $(terraform output cluster_name) ```
OR enter the command ``` terraform output kubeconfig ``` and copy the output and paste it in the .kube/config file in your machine
```kubectl cluster-info``` enter this command to verify the cluster is up and running

# Deploy pods to the Cluster
```
  kubectl create -f cloudl-server-service.yml 
  kubectl create -f cloudl-server-deployment.yml 
  kubectl create -f cloudl-redis-service.yml 
  kubectl create -f cloudl-redis-deployment.yml 
  kubectl create -f cloudl-client-service.yml 
  kubectl create -f cloudl-client-deployment.yml
  
  kubectl get svc
  
  ```
  Then u will get the ip address:
  ```
  NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)          AGE
cloudl-client-service   LoadBalancer   172.20.127.215   a82fad4d0f5f94db4bb46e29072aae0a-1101398906.us-west-2.elb.amazonaws.com   80:30213/TCP     35s

  ```
  Copy and paste the EXTERNAL-IP of the load balancer in your browser and the application is ready to use
  
  # Exiting
  After finishing the delete all the pods and service with the command:
  ```
  kubectl delete daemonsets,replicasets,services,deployments,pods,rc --all
  
  ```
  And destroy the EKS resources on aws using :
  ```
  terraform destroy 
  
   ```
  
  
