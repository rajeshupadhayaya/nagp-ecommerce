terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  
  # Backend configuration for storing state in S3
  # NOTE: Update the bucket name to match terraform_state_bucket in terraform.tfvars
  # The S3 bucket must be created manually before running terraform init
  backend "s3" {
    bucket = "ru-terraform-state-bucket"
    key    = "terraform.tfstate"
    region = "ap-south-1"
  }
}

provider "aws" {
  region = var.aws_region
}
