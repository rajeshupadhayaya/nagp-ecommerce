output "cluster_name" {
  description = "The name of the ECS cluster."
  value       = aws_ecs_cluster.main.name
}

output "service_name" {
  description = "The name of the ECS service."
  value       = aws_ecs_service.main.name
}

output "task_definition_family" {
  description = "The family of the task definition."
  value       = aws_ecs_task_definition.app_task.family
}
