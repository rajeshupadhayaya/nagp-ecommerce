variable "app_name" {
  description = "The name of the application."
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC."
  type        = string
}

variable "subnet_ids" {
  description = "The IDs of the subnets."
  type        = list(string)
}

variable "lb_security_group_id" {
  description = "The ID of the load balancer security group."
  type        = string
}
