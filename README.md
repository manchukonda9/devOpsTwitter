# devOpsTwitter
#Single command Deployement using Terraform (Automation)
Pre-requisites
1. Install Terraform 
2. Install Kubectl 
3. Configure aws credentials and provide with correct access policies
4. Install aws-iam-authenticator so that kubeconfig can be easily done

#Bring up eks on aws
$ git clone github.com/manchukonda9/devOpsTwitter.git
$ cd automation
$ terraform init
$ terraform plan
$ terraform apply # when provided prompt click on yes
