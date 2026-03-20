module "network" {
  source   = "./modules/network"
  app_name = var.app_name
}

module "ecr" {
  source   = "./modules/ecr"
  app_name = var.app_name
}

module "iam" {
  source      = "./modules/iam"
  app_name    = var.app_name
  github_repo = var.github_repo
}

module "lb" {
  source                = "./modules/lb"
  app_name              = var.app_name
  vpc_id                = module.network.vpc_id
  subnet_ids            = module.network.subnet_ids
  lb_security_group_id  = module.network.lb_security_group_id
}

module "ecs" {
  source                              = "./modules/ecs"
  app_name                            = var.app_name
  app_port                            = var.app_port
  cpu                                 = var.cpu
  memory                              = var.memory
  ecr_repository_url                  = module.ecr.repository_url
  ecs_task_execution_role_arn         = module.iam.ecs_task_execution_role_arn
  subnet_ids                          = module.network.subnet_ids
  service_security_group_id           = module.network.service_security_group_id
  target_group_arn                    = module.lb.target_group_arn
  listener_arn                        = module.lb.listener_arn
  lb_arn_suffix                       = module.lb.lb_arn_suffix
  target_group_arn_suffix             = module.lb.target_group_arn_suffix
  autoscaling_min_tasks               = var.autoscaling_min_tasks
  autoscaling_max_tasks               = var.autoscaling_max_tasks
  autoscaling_cpu_threshold           = var.autoscaling_cpu_threshold
  autoscaling_memory_threshold        = var.autoscaling_memory_threshold
  autoscaling_request_count_threshold = var.autoscaling_request_count_threshold
}
