terraform {
  required_version = ">= 1.6.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.27"
    }
  }
}

# The kubernetes provider reads the kubeconfig from the path supplied in
# var.kubeconfig_path. On the VPS this is /etc/rancher/k3s/k3s.yaml.
# Locally you can point it at a downloaded copy of the file.
provider "kubernetes" {
  config_path = var.kubeconfig_path
}
