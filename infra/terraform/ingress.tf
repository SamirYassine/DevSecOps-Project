resource "kubernetes_ingress_v1" "quess" {
  metadata {
    name      = "quess-ingress"
    namespace = kubernetes_namespace.quess.metadata[0].name
    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
    }
  }

  spec {
    rule {
      host = var.ingress_host

      http {
        # API traffic routed to the nginx sidecar (which proxies to PHP-FPM).
        path {
          path      = "/api"
          path_type = "Prefix"

          backend {
            service {
              name = "quess-nginx"
              port {
                number = 80
              }
            }
          }
        }

        # All other traffic goes to the React frontend.
        path {
          path      = "/"
          path_type = "Prefix"

          backend {
            service {
              name = kubernetes_service.frontend.metadata[0].name
              port {
                number = 80
              }
            }
          }
        }
      }
    }
  }
}
