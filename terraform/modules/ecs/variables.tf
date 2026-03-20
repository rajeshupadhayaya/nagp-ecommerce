variable "app_name" {
  description = "The name of the application."
  type        = string
}

variable "app_port" {
  description = "The port the application container listens on."
  type        = number
}

variable "cpu" {
  description = "The CPU units to allocate for the container."
  type        = number
}

variable "memory" {
  description = "The memory to allocate for the container."
  type        = number
}

variable "ecr_repository_url" {
  description = "The URL of the ECR repository."
  type        = string
}

variable "ecs_task_execution_role_arn" {
  description = "The ARN of the ECS task execution role."
  type        = string
}

variable "subnet_ids" {
  description = "The IDs of the subnets."
  type        = list(string)
}

variable "service_security_group_id" {
  description = "The ID of the ECS service security group."
  type        = string
}

variable "target_group_arn" {
  description = "The ARN of the target group."
  type        = string
}

variable "listener_arn" {
  description = "The ARN of the listener."
  type        = string
}

variable "lb_arn_suffix" {
  description = "The ARN suffix of the load balancer."
  type        = string
}

variable "target_group_arn_suffix" {
  description = "The ARN suffix of the target group."
  type        = string
}

variable "autoscaling_min_tasks" {
  description = "Minimum number of tasks for autoscaling."
  type        = number
}

variable "autoscaling_max_tasks" {
  description = "Maximum number of tasks for autoscaling."
  type        = number
}

variable "autoscaling_cpu_threshold" {
  description = "CPU utilization threshold for autoscaling (percentage)."
  type        = number
}

variable "autoscaling_memory_threshold" {
  description = "Memory utilization threshold for autoscaling (percentage)."
  type        = number
}

variable "autoscaling_request_count_threshold" {
  description = "Request count per target threshold for autoscaling."
  type        = number
}
