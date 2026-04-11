output "namespace" {
  description = "Kubernetes namespace where QUESS is deployed."
  value       = kubernetes_namespace.quess.metadata[0].name
}

output "backend_service" {
  description = "ClusterIP service name for the backend."
  value       = kubernetes_service.backend.metadata[0].name
}

output "frontend_service" {
  description = "ClusterIP service name for the frontend."
  value       = kubernetes_service.frontend.metadata[0].name
}

output "mysql_service" {
  description = "Headless service name for MySQL."
  value       = kubernetes_service.mysql.metadata[0].name
}

output "ingress_host" {
  description = "Public hostname for the QUESS application."
  value       = "http://${var.ingress_host}"
}
