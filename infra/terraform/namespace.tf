resource "kubernetes_namespace" "quess" {
  metadata {
    name = var.namespace

    labels = {
      "app.kubernetes.io/managed-by" = "terraform"
      "app.kubernetes.io/part-of"    = "quess"
    }
  }
}
