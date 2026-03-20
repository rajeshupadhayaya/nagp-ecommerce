output "vpc_id" {
  description = "The ID of the VPC."
  value       = aws_default_vpc.main.id
}

output "subnet_ids" {
  description = "The IDs of the subnets."
  value       = [for subnet in aws_default_subnet.all : subnet.id]
}

output "lb_security_group_id" {
  description = "The ID of the load balancer security group."
  value       = aws_security_group.lb_sg.id
}

output "service_security_group_id" {
  description = "The ID of the ECS service security group."
  value       = aws_security_group.service_sg.id
}
