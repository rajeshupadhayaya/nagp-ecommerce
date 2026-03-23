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
1. AWS credentials configured (via environment variables or AWS CLI)
2. Terraform installed (v1.0+)
3. S3 bucket created manually for state storage
4. Update `terraform.tfvars` with your GitHub repository name and state bucket name
5. Update `backend.hcl` with your S3 bucket name (should match terraform.tfvars)

### Step 1: Initialize Terraform

```bash
cd terraform
terraform init -backend-config=backend.hcl
```

This initializes Terraform and configures the S3 backend for state storage.

### Step 2: Validate Configuration

```bash
terraform validate
terraform fmt -recursive
```

### Step 3: Deployment Options

#### Option A: Full Infrastructure Deployment (All at Once)

Deploy everything in one go:

```bash
terraform plan
terraform apply
```

Or with auto-approval:
```bash
terraform apply -auto-approve
```

#### Option B: Incremental Deployment (Recommended for Testing)

**Phase 1: Deploy ECR and IAM (for Build Pipeline Testing)**

```bash
terraform apply -target=module.ecr -target=module.iam
```

This creates:
- ECR repository for Docker images
- IAM roles for GitHub Actions

**Test your build pipeline:**
- Push code to `master` branch
- Verify GitHub Actions builds and pushes Docker image to ECR
- Check ECR console for the image

**Phase 2: Deploy Remaining Infrastructure (for Deployment)**

```bash
terraform apply
```

This creates:
- Network resources (security groups)
- Load Balancer and Target Group
- ECS Cluster and Service with autoscaling

#### Option C: Target Specific Modules

Deploy specific modules individually:

```bash
# Network only
terraform apply -target=module.network

# Load Balancer only
terraform apply -target=module.lb

# ECS only
terraform apply -target=module.ecs
```

### Step 4: View Outputs

```bash
terraform output
terraform output load_balancer_dns
terraform output ecr_repository_url
```

### Step 5: Configure GitHub

1. Go to your GitHub repository settings
2. Navigate to: **Settings** > **Secrets and variables** > **Actions**
3. Click on **Variables** tab
4. Add repository variables:
   - Name: `AWS_ACCOUNT_ID`
   - Value: Your 12-digit AWS account ID

### Step 6: Deploy Application

Once infrastructure is ready:
1. Push your code to the `master` branch
2. The `Build and Push to ECR` workflow will automatically run
3. The `Deploy to ECS` workflow will update your ECS service

## Common Terraform Commands

### Planning and Deployment
```bash
# Preview changes
terraform plan

# Preview changes and save to file
terraform plan -out=tfplan

# Apply saved plan
terraform apply tfplan

# Apply with auto-approval
terraform apply -auto-approve

# Apply targeting specific resources
terraform apply -target=module.ecr -target=module.iam
```

### State Management
```bash
# List resources in state
terraform state list

# Show specific resource details
terraform state show module.ecr.aws_ecr_repository.app_ecr_repo

# Refresh state from AWS
terraform refresh

# Pull remote state
terraform state pull

# Remove resource from state (does not destroy)
terraform state rm module.ecs.aws_ecs_service.main
```

### Inspection and Debugging
```bash
# Show all outputs
terraform output

# Show specific output
terraform output load_balancer_dns

# Show current configuration
terraform show

# Validate configuration
terraform validate

# Format configuration files
terraform fmt -recursive

# Check for syntax errors
terraform fmt -check -recursive
```

### Workspace Management
```bash
# List workspaces
terraform workspace list

# Create new workspace
terraform workspace new dev

# Switch workspace
terraform workspace select prod

# Show current workspace
terraform workspace show
```

### Destroying Resources
```bash
# Destroy all resources
terraform destroy

# Destroy with auto-approval
terraform destroy -auto-approve

# Destroy specific resources
terraform destroy -target=module.ecs -target=module.lb

# Preview destruction
terraform plan -destroy
```

### Re-initialization
```bash
# Reinitialize (e.g., after backend changes)
terraform init -reconfigure

# Migrate state to new backend
terraform init -migrate-state

# Upgrade provider versions
terraform init -upgrade
```

### Troubleshooting Commands
```bash
# Enable detailed logging
export TF_LOG=DEBUG
terraform plan

# Enable specific log types
export TF_LOG=TRACE
terraform apply

# Log to file
export TF_LOG_PATH=./terraform.log
terraform apply

# Disable logging
unset TF_LOG
unset TF_LOG_PATH

# Unlock state (if locked)
terraform force-unlock LOCK_ID

# Import existing resource
terraform import module.ecr.aws_ecr_repository.app_ecr_repo ecommerce-app-repo
```

### Graph and Visualization
```bash
# Generate dependency graph
terraform graph | dot -Tpng > graph.png

# Show resource graph in DOT format
terraform graph
```

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

⚠️ **State Management**: State is stored in S3 bucket (configured via `backend.hcl`). The bucket must be created manually before running `terraform init`.

⚠️ **GitHub OIDC Trust**: The IAM role trusts your GitHub repository based on the `github_repo` variable in `terraform.tfvars`. Make sure this is set correctly (format: `owner/repo`).

⚠️ **First Deployment**: The ECS service will fail to start initially because there's no Docker image in ECR. Follow the incremental deployment approach (Phase 1 → Test Build → Phase 2) to avoid this issue.

⚠️ **Default VPC**: This configuration uses the AWS default VPC. Ensure your default VPC exists in the region you're deploying to.

## AWS CLI Commands for Manual Setup

### Create S3 Bucket for Terraform State
```bash
# Create bucket
aws s3 mb s3://ru-terraform-state-bucket --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket ru-terraform-state-bucket \
  --version`terraform init` fails with "Error configuring the backend"
- **Solution**: Ensure the S3 bucket exists and you have permissions to access it
- **Command**: `aws s3 ls s3://ru-terraform-state-bucket`

**Issue**: Backend initialization fails
- **Solution**: Verify `backend.hcl` has the correct bucket name matching your S3 bucket
- **Command**: `cat backend.hcl` and compare with `aws s3 ls`

**Issue**: "Error acquiring the state lock"
- **Solution**: Another terraform process may be running, or a previous run crashed
- **Command**: `terraform force-unlock <LOCK_ID>` (use the ID from the error message)

**Issue**: ECS service fails to start
- **Solution**: Ensure a Docker image is pushed to ECR before the service starts
- **Command**: `aws ecr describe-images --repository-name ecommerce-app-repo`

**Issue**: GitHub Actions cannot assume role
- **Solution**: Verify the `github_repo` variable in `terraform.tfvars` matches your repository exactly (format: `owner/repo`)
- **Check**: GitHub repo settings match the IAM role trust policy

**Issue**: "No changes. Infrastructure is up-to-date"
- **Solution**: This is normal if no changes were made to the configuration

**Issue**: Module not found errors
- **Solution**: Ensure you're in the `terraform` directory and modules folder exists
- **Command**: `ls -la modules/`

**Issue**: Invalid provider configuration
- **Solution**: Run `terraform init -upgrade` to update providers

**Issue**: AWS credentials not found
- **Solution**: Set AWS environment variables or configure AWS CLI
- **Commands**: See "Set AWS Environment Variables" section above
# Check current identity
aws sts get-caller-identity

# List available regions
aws ec2 describe-regions --output table

# Check default VPC
aws ec2 describe-vpcs --filters "Name=isDefault,Values=true"
```

### Set AWS Environment Variables (PowerShell)
```powershell
$env:AWS_ACCESS_KEY_ID = "your-access-key-id"
$env:AWS_SECRET_ACCESS_KEY = "your-secret-access-key"
$env:AWS_DEFAULT_REGION = "us-east-1"
```

### Set AWS Environment Variables (Bash/WSL)
```bash
export AWS_ACCESS_KEY_ID="your-access-key-id"
export AWS_SECRET_ACCESS_KEY="your-secret-access-key"
export AWS_DEFAULT_REGION="us-east-1"
```

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
