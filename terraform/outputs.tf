output "load_balancer_dns" {
  description = "The DNS name of the load balancer."
  value       = module.lb.lb_dns_name
}

output "ecr_repository_url" {
  description = "The URL of the ECR repository."
  value       = module.ecr.repository_url
}

output "ecs_cluster_name" {
  description = "The name of the ECS cluster."
  value       = module.ecs.cluster_name
}

output "ecs_service_name" {
  description = "The name of the ECS service."
  value       = module.ecs.service_name
}

output "github_actions_role_arn" {
  description = "The ARN of the GitHub Actions role."
  value       = module.iam.github_actions_role_arn
}
