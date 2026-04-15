# QUESS Infra Guide

This file is a quick operator guide for the QUESS infrastructure on K3s.

## Scope

- Kubernetes manifests: `infra/k8s/`
- Monitoring config: `infra/monitoring/`
- Ansible provisioning: `infra/ansible/`
- Terraform alternative definitions: `infra/terraform/`

## Environment

- Cluster: K3s (single node)
- Namespace: `quess`
- Monitoring namespace: `monitoring`
- App URL: `http://quess.141.147.6.140.nip.io`
- Grafana URL: `http://grafana.141.147.6.140.nip.io`

## Apply K8s Manifests

Run from the repository root on the VPS:

```bash
kubectl apply -f infra/k8s/namespace.yml
kubectl apply -f infra/k8s/secrets.yml
kubectl apply -f infra/k8s/configmap.yml
kubectl apply -f infra/k8s/mysql-statefulset.yml
kubectl apply -f infra/k8s/backend-deployment.yml
kubectl apply -f infra/k8s/nginx-deployment.yml
kubectl apply -f infra/k8s/frontend-deployment.yml
kubectl apply -f infra/k8s/ingress.yml
kubectl apply -f infra/k8s/network-policy.yml
```

## Monitoring (Helm)

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm upgrade --install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace \
  -f infra/monitoring/helm-values.yml
```

## Day 7 Deployment Flow

Pipeline on `main` does:

1. build/push backend and frontend images to GHCR
2. SSH to VPS
3. run `kubectl set image` for `quess-backend` and `quess-frontend`
4. wait for rollout status

Required GitHub Secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`

## Day 8 Hardening Verification

Health endpoint:

```bash
curl -i http://quess.141.147.6.140.nip.io/api/health
```

Expected:

- HTTP `200`
- JSON body with `{"status":"ok","service":"quess-backend"}`

Check probes and resources:

```bash
kubectl -n quess get deploy quess-backend -o jsonpath='{.spec.template.spec.containers[0].resources}{"\n"}{.spec.template.spec.containers[0].readinessProbe}{"\n"}{.spec.template.spec.containers[0].livenessProbe}{"\n"}'
kubectl -n quess get deploy quess-frontend -o jsonpath='{.spec.template.spec.containers[0].resources}{"\n"}{.spec.template.spec.containers[0].readinessProbe}{"\n"}{.spec.template.spec.containers[0].livenessProbe}{"\n"}'
kubectl -n quess get deploy quess-nginx -o jsonpath='{.spec.template.spec.containers[0].resources}{"\n"}{.spec.template.spec.containers[0].readinessProbe}{"\n"}{.spec.template.spec.containers[0].livenessProbe}{"\n"}'
kubectl -n quess get statefulset quess-mysql -o jsonpath='{.spec.template.spec.containers[0].resources}{"\n"}{.spec.template.spec.containers[0].readinessProbe}{"\n"}{.spec.template.spec.containers[0].livenessProbe}{"\n"}'
```

Check network policies:

```bash
kubectl get networkpolicy -n quess
```

Expected:

- `allow-nginx-to-backend`
- `allow-backend-to-mysql`

## Quick Troubleshooting

Pods and rollout:

```bash
kubectl -n quess get pods -o wide
kubectl -n quess rollout status deployment/quess-backend --timeout=180s
kubectl -n quess rollout status deployment/quess-frontend --timeout=180s
kubectl -n quess rollout status deployment/quess-nginx --timeout=180s
```

Inspect failing pod:

```bash
kubectl -n quess describe pod <pod-name>
kubectl -n quess logs <pod-name> --tail=150
kubectl -n quess logs <pod-name> --previous --tail=150
```

Rollback a deployment:

```bash
kubectl -n quess rollout undo deployment/quess-backend
kubectl -n quess rollout undo deployment/quess-frontend
kubectl -n quess rollout undo deployment/quess-nginx
```
