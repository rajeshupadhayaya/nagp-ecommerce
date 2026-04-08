variable "aws_region" {
  description = "The AWS region to deploy resources in."
  default     = "ap-south-1"
}

variable "app_name" {
  description = "The name of the application."
  default     = "ecommerce-app"
}

variable "app_port" {
  description = "The port the application container listens on."
  default     = 3000
}

variable "cpu" {
  description = "The CPU units to allocate for the container."
  default     = 2048
}

variable "memory" {
  description = "The memory to allocate for the container."
  default     = 4096
}

variable "github_repo" {
  description = "The GitHub repository in the format owner/repo."
  type        = string
}

variable "terraform_state_bucket" {
  description = "The name of the S3 bucket for storing Terraform state."
  type        = string
  default     = "ecommerce-app-terraform-state-bucket"
}

variable "autoscaling_min_tasks" {
  description = "Minimum number of tasks for autoscaling."
  type        = number
  default     = 0
}

variable "autoscaling_max_tasks" {
  description = "Maximum number of tasks for autoscaling."
  type        = number
  default     = 5
}

variable "autoscaling_cpu_threshold" {
  description = "CPU utilization threshold for autoscaling (percentage)."
  type        = number
  default     = 65
}

variable "autoscaling_memory_threshold" {
  description = "Memory utilization threshold for autoscaling (percentage)."
  type        = number
  default     = 65
}

variable "autoscaling_request_count_threshold" {
  description = "Request count per target threshold for autoscaling."
  type        = number
  default     = 5000
}
