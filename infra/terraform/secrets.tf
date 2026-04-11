# Application secrets — sensitive values come from terraform.tfvars (gitignored).
resource "kubernetes_secret" "quess_app" {
  metadata {
    name      = "quess-secrets"
    namespace = kubernetes_namespace.quess.metadata[0].name
  }

  type = "Opaque"

  data = {
    DATABASE_URL    = "mysql://${var.mysql_user}:${var.mysql_password}@quess-mysql:3306/${var.mysql_database}?serverVersion=8.0"
    APP_SECRET      = var.app_secret
    JWT_PASSPHRASE  = var.jwt_passphrase
    MYSQL_PASSWORD  = var.mysql_password
    MYSQL_ROOT_PASSWORD = var.mysql_root_password
  }

  # Store JWT keys as binary-safe base64 blobs decoded by Kubernetes.
  binary_data = {
    "jwt_private.pem" = var.jwt_private_key_b64
    "jwt_public.pem"  = var.jwt_public_key_b64
  }
}

# GHCR image pull secret.
resource "kubernetes_secret" "ghcr" {
  metadata {
    name      = "ghcr-secret"
    namespace = kubernetes_namespace.quess.metadata[0].name
  }

  type = "kubernetes.io/dockerconfigjson"

  binary_data = {
    ".dockerconfigjson" = var.ghcr_secret_b64
  }
}
