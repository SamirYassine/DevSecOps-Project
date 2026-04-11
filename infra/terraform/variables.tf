variable "kubeconfig_path" {
  description = "Absolute path to the kubeconfig file for the K3s cluster."
  type        = string
  default     = "/etc/rancher/k3s/k3s.yaml"
}

variable "namespace" {
  description = "Kubernetes namespace for the QUESS application."
  type        = string
  default     = "quess"
}

variable "image_registry" {
  description = "Container registry prefix for QUESS images."
  type        = string
  default     = "ghcr.io/samiryassine/devsecops-project"
}

variable "backend_image_tag" {
  description = "Docker image tag for the backend."
  type        = string
  default     = "latest"
}

variable "frontend_image_tag" {
  description = "Docker image tag for the frontend."
  type        = string
  default     = "latest"
}

variable "mysql_database" {
  description = "MySQL database name."
  type        = string
  default     = "quess"
}

variable "mysql_user" {
  description = "MySQL application user."
  type        = string
  default     = "quess"
}

variable "mysql_password" {
  description = "MySQL application user password."
  type        = string
  sensitive   = true
}

variable "mysql_root_password" {
  description = "MySQL root password."
  type        = string
  sensitive   = true
}

variable "app_secret" {
  description = "Symfony APP_SECRET value."
  type        = string
  sensitive   = true
}

variable "jwt_passphrase" {
  description = "Passphrase used to encrypt the JWT private key."
  type        = string
  sensitive   = true
}

variable "jwt_private_key_b64" {
  description = "Base64-encoded JWT private key (PEM)."
  type        = string
  sensitive   = true
}

variable "jwt_public_key_b64" {
  description = "Base64-encoded JWT public key (PEM)."
  type        = string
  sensitive   = true
}

variable "ghcr_secret_b64" {
  description = "Base64-encoded Docker config JSON for GHCR pull secret."
  type        = string
  sensitive   = true
}

variable "ingress_host" {
  description = "Hostname for the Traefik Ingress resource."
  type        = string
  default     = "quess.141.147.6.140.nip.io"
}
