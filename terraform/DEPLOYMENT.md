# Terraform Infrastructure Deployment Guide

## Overview
This Terraform configuration creates a complete AWS infrastructure for your e-commerce application using a modular approach.

## Components Created

✅ **1. Load Balancer (ALB)**
   - Module: `modules/lb`
   - Creates: Application Load Balancer, Target Group, HTTP Listener
   - Depends on: Network module (VPC, subnets, security groups)

✅ **2. Amazon ECR Repository**
   - Module: `modules/ecr`
   - Creates: ECR repository to store Docker images
   - Image scanning enabled
   - Name: `ecommerce-app-repo`

✅ **3. ECS Cluster**
   - Module: `modules/ecs`
   - Creates: ECS Cluster named `ecommerce-app-cluster`
   - Type: Fargate

✅ **4. ECS Service**
   - Module: `modules/ecs`
   - Creates: ECS Service named `ecommerce-app-service`
   - Task Definition: `ecommerce-app-task`
   - Depends on: ECR, IAM, Network, Load Balancer

✅ **5. IAM Roles**
   - Module: `modules/iam`
   - Creates:
     - ECS Task Execution Role (for ECS to pull images from ECR)
     - GitHub Actions OIDC Provider
     - GitHub Actions Role with permissions for ECR push and ECS deployment

✅ **6. S3 Bucket for Terraform State**
   - Module: `modules/state`
   - Creates: S3 bucket with versioning enabled
   - Name: `ecommerce-app-terraform-state-bucket`
   - Protected from accidental deletion

✅ **7. Network Infrastructure**
   - Module: `modules/network`
   - Creates: Default VPC, Subnets, Security Groups
   - Load Balancer Security Group (port 80 from internet)
   - ECS Service Security Group (all ports from LB only)

## Deployment Process

### Prerequisites
1. AWS CLI configured with appropriate credentials
2. Terraform installed (v1.0+)
3. Update `terraform.tfvars` with your GitHub repository name

### Step 1: Initial Deployment (Create Infrastructure)

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

This will create:
- S3 bucket for state storage
- All infrastructure components (ECR, ECS, IAM, Network, LB)

### Step 2: Migrate State to S3 (Optional but Recommended)

After the first apply, you can migrate your state to S3:

1. Edit `providers.tf` and uncomment the backend configuration:
   ```hcl
   backend "s3" {
     bucket = "ecommerce-app-terraform-state-bucket"
     key    = "terraform.tfstate"
     region = "us-east-1"
   }
   ```

2. Re-initialize Terraform:
   ```bash
   terraform init -migrate-state
   ```

3. Type `yes` when prompted to migrate the state

### Step 3: Configure GitHub

1. Go to your GitHub repository settings
2. Navigate to: **Settings** > **Secrets and variables** > **Actions**
3. Add a repository variable:
   - Name: `AWS_ACCOUNT_ID`
   - Value: Your 12-digit AWS account ID

### Step 4: Deploy Application

Once infrastructure is ready:
1. Push your code to the `main` branch
2. The `Build and Push to ECR` workflow will automatically run
3. The `Deploy to ECS` workflow will update your ECS service

## Module Dependencies

```
network ─┐
         ├─→ lb ─┐
         │       │
ecr ─────┼───────┼─→ ecs
         │       │
iam ─────┴───────┘

state (independent)
```

## Important Notes

⚠️ **State Management**: The S3 bucket is created by Terraform but is also used to store Terraform state. This is handled through a two-step process (initial apply without backend, then migrate).

⚠️ **GitHub OIDC Trust**: The IAM role trusts your GitHub repository based on the `github_repo` variable in `terraform.tfvars`. Make sure this is set correctly.

⚠️ **First Deployment**: The ECS service will fail to start initially because there's no Docker image in ECR. Push an image using the GitHub Actions workflow or manually.

## Outputs

After successful deployment, Terraform will output:
- `load_balancer_dns` - URL to access your application
- `ecr_repository_url` - ECR repository URL for pushing images
- `ecs_cluster_name` - ECS cluster name
- `ecs_service_name` - ECS service name
- `github_actions_role_arn` - ARN of the GitHub Actions role
- `s3_state_bucket` - S3 bucket name for state storage

## Troubleshooting

**Issue**: Backend initialization fails
- **Solution**: Ensure S3 bucket is created first by running `terraform apply` without the backend block

**Issue**: ECS service fails to start
- **Solution**: Ensure a Docker image is pushed to ECR before the service starts

**Issue**: GitHub Actions cannot assume role
- **Solution**: Verify the `github_repo` variable in `terraform.tfvars` matches your repository exactly (format: `owner/repo`)
