output "ecs_task_execution_role_arn" {
  description = "The ARN of the ECS task execution role."
  value       = aws_iam_role.ecs_task_execution_role.arn
}

output "github_actions_role_arn" {
  description = "The ARN of the GitHub Actions role."
  value       = aws_iam_role.github_actions_role.arn
}
