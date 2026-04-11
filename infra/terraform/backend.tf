resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "quess-backend"
    namespace = kubernetes_namespace.quess.metadata[0].name
    labels = {
      "app.kubernetes.io/name"       = "quess-backend"
      "app.kubernetes.io/part-of"    = "quess"
      "app.kubernetes.io/managed-by" = "terraform"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "quess-backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "quess-backend"
        }
      }

      spec {
        image_pull_secrets {
          name = kubernetes_secret.ghcr.metadata[0].name
        }

        container {
          name  = "backend"
          image = "${var.image_registry}/quess-backend:${var.backend_image_tag}"
          image_pull_policy = "Always"

          port {
            container_port = 9000
          }

          env_from {
            config_map_ref {
              name = "quess-config"
            }
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.quess_app.metadata[0].name
            }
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name      = "quess-backend"
    namespace = kubernetes_namespace.quess.metadata[0].name
  }

  spec {
    selector = {
      app = "quess-backend"
    }

    port {
      port        = 9000
      target_port = 9000
    }

    type = "ClusterIP"
  }
}
