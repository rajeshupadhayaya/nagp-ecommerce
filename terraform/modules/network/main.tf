resource "aws_default_vpc" "main" {}

resource "aws_default_subnet" "all" {
  for_each = toset(data.aws_availability_zones.available.names)
  availability_zone = each.key
}

data "aws_availability_zones" "available" {}

resource "aws_security_group" "lb_sg" {
  name        = "${var.app_name}-lb-sg"
  description = "Security group for the load balancer"
  vpc_id      = aws_default_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "service_sg" {
  name        = "${var.app_name}-service-sg"
  description = "Security group for the ECS service"
  vpc_id      = aws_default_vpc.main.id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    security_groups = [aws_security_group.lb_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
