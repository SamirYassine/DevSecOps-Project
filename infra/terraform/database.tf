resource "kubernetes_stateful_set" "mysql" {
  metadata {
    name      = "quess-mysql"
    namespace = kubernetes_namespace.quess.metadata[0].name
    labels = {
      "app.kubernetes.io/name"       = "quess-mysql"
      "app.kubernetes.io/part-of"    = "quess"
      "app.kubernetes.io/managed-by" = "terraform"
    }
  }

  spec {
    service_name = "quess-mysql"
    replicas     = 1

    selector {
      match_labels = {
        app = "quess-mysql"
      }
    }

    template {
      metadata {
        labels = {
          app = "quess-mysql"
        }
      }

      spec {
        container {
          name  = "mysql"
          image = "mysql:8.0"

          port {
            container_port = 3306
          }

          env {
            name = "MYSQL_ROOT_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.quess_app.metadata[0].name
                key  = "MYSQL_ROOT_PASSWORD"
              }
            }
          }

          env {
            name  = "MYSQL_DATABASE"
            value = var.mysql_database
          }

          env {
            name  = "MYSQL_USER"
            value = var.mysql_user
          }

          env {
            name = "MYSQL_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.quess_app.metadata[0].name
                key  = "MYSQL_PASSWORD"
              }
            }
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "256Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
          }

          volume_mount {
            name       = "mysql-data"
            mount_path = "/var/lib/mysql"
          }
        }
      }
    }

    volume_claim_template {
      metadata {
        name = "mysql-data"
      }

      spec {
        access_modes = ["ReadWriteOnce"]

        resources {
          requests = {
            storage = "5Gi"
          }
        }
      }
    }
  }
}

# Headless service for StatefulSet DNS resolution.
resource "kubernetes_service" "mysql" {
  metadata {
    name      = "quess-mysql"
    namespace = kubernetes_namespace.quess.metadata[0].name
  }

  spec {
    selector = {
      app = "quess-mysql"
    }

    cluster_ip = "None"

    port {
      port        = 3306
      target_port = 3306
    }
  }
}
