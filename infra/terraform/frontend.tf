resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "quess-frontend"
    namespace = kubernetes_namespace.quess.metadata[0].name
    labels = {
      "app.kubernetes.io/name"       = "quess-frontend"
      "app.kubernetes.io/part-of"    = "quess"
      "app.kubernetes.io/managed-by" = "terraform"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "quess-frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "quess-frontend"
        }
      }

      spec {
        image_pull_secrets {
          name = kubernetes_secret.ghcr.metadata[0].name
        }

        container {
          name  = "frontend"
          image = "${var.image_registry}/quess-frontend:${var.frontend_image_tag}"
          image_pull_policy = "Always"

          port {
            container_port = 80
          }

          resources {
            requests = {
              cpu    = "50m"
              memory = "64Mi"
            }
            limits = {
              cpu    = "200m"
              memory = "128Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "quess-frontend"
    namespace = kubernetes_namespace.quess.metadata[0].name
  }

  spec {
    selector = {
      app = "quess-frontend"
    }

    port {
      port        = 80
      target_port = 80
    }

    type = "ClusterIP"
  }
}
