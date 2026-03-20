output "lb_dns_name" {
  description = "The DNS name of the load balancer."
  value       = aws_lb.main.dns_name
}

output "target_group_arn" {
  description = "The ARN of the target group."
  value       = aws_lb_target_group.app_tg.arn
}

output "listener_arn" {
  description = "The ARN of the listener."
  value       = aws_lb_listener.http.arn
}

output "lb_arn_suffix" {
  description = "The ARN suffix of the load balancer."
  value       = aws_lb.main.arn_suffix
}

output "target_group_arn_suffix" {
  description = "The ARN suffix of the target group."
  value       = aws_lb_target_group.app_tg.arn_suffix
}
