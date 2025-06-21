# 🚀 CI/CD Pipeline Setup Guide

This guide will help you set up a complete CI/CD pipeline for your Vehicle Rental Management microservices platform.

## 📋 Prerequisites

### 1. GitHub Repository Setup

- Repository with your microservices code
- GitHub Actions enabled
- Access to repository settings

### 2. Docker Hub Account

- Docker Hub account: `mohammed761`
- Docker Hub access token

### 3. AWS Account

- AWS account with appropriate permissions
- AWS CLI configured
- kubectl installed

### 4. Domain Name

- Domain name for your application (e.g., `vehiclerental.com`)

## 🔧 Step-by-Step Setup

### Step 1: GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

```bash
# Docker Hub credentials
DOCKER_USERNAME=mohammed761
DOCKER_PASSWORD=your-docker-hub-token

# AWS credentials
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key

# Database password
DB_PASSWORD=your-secure-database-password

# JWT Secret
JWT_SECRET=your-jwt-secret-key
```

### Step 2: AWS Infrastructure Setup

#### 2.1 Install Terraform

```bash
# Download and install Terraform
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs)"
sudo apt-get update && sudo apt-get install terraform
```

#### 2.2 Deploy Infrastructure

```bash
cd infrastructure/terraform

# Initialize Terraform
terraform init

# Plan the deployment
terraform plan -var="db_password=your-secure-password"

# Deploy infrastructure
terraform apply -var="db_password=your-secure-password"
```

#### 2.3 Configure kubectl

```bash
# Update kubeconfig for your EKS cluster
aws eks update-kubeconfig --name vehicle-rental-cluster --region us-east-1

# Verify connection
kubectl get nodes
```

### Step 3: Install Kubernetes Add-ons

#### 3.1 Install NGINX Ingress Controller

```bash
# Add the NGINX ingress repository
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Install NGINX ingress controller
helm install nginx-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.replicaCount=2
```

#### 3.2 Install Cert-Manager for SSL

```bash
# Install cert-manager
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.13.0 \
  --set installCRDs=true
```

#### 3.3 Create Cluster Issuer

```bash
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

### Step 4: Deploy Monitoring Stack

#### 4.1 Create Monitoring Namespace

```bash
kubectl create namespace monitoring
```

#### 4.2 Deploy Prometheus and Grafana

```bash
# Deploy Prometheus
kubectl apply -f monitoring/prometheus-config.yaml
kubectl apply -f monitoring/prometheus.yaml

# Deploy Grafana
kubectl apply -f monitoring/grafana.yaml
```

#### 4.3 Access Monitoring Dashboards

```bash
# Port forward to access Grafana
kubectl port-forward -n monitoring svc/grafana 3000:3000

# Access Grafana at http://localhost:3000
# Username: admin
# Password: admin123
```

### Step 5: Deploy Application

#### 5.1 Create Production Namespace

```bash
kubectl apply -f k8s/production/namespace.yaml
```

#### 5.2 Update Secrets

```bash
# Update the secret with base64 encoded values
kubectl apply -f k8s/production/secret.yaml
```

#### 5.3 Deploy Services

```bash
# Deploy all services
kubectl apply -f k8s/production/
```

### Step 6: Configure DNS

#### 6.1 Update Domain DNS

Point your domain to the AWS Load Balancer:

- Get the ALB DNS name from AWS Console
- Update your domain's A record to point to the ALB

#### 6.2 Verify Deployment

```bash
# Check all pods are running
kubectl get pods -n vehicle-rental-prod

# Check services
kubectl get svc -n vehicle-rental-prod

# Check ingress
kubectl get ingress -n vehicle-rental-prod
```

## 🔄 CI/CD Pipeline Flow

### Development Workflow

1. **Feature Branch**: Create feature branch from `develop`
2. **Development**: Make changes and test locally
3. **Pull Request**: Create PR to `develop` branch
4. **Automated Testing**: GitHub Actions runs tests
5. **Code Review**: Team reviews the PR
6. **Merge**: Merge to `develop` branch

### Staging Deployment

1. **Auto Deploy**: Changes to `develop` auto-deploy to staging
2. **Testing**: Test in staging environment
3. **Validation**: Verify all functionality works

### Production Deployment

1. **Release**: Create PR from `develop` to `main`
2. **Approval**: Get approval for production deployment
3. **Deploy**: Merge to `main` triggers production deployment
4. **Monitoring**: Monitor deployment and application health

## 📊 Monitoring and Observability

### Prometheus Metrics

- **Application Metrics**: Request rates, response times, error rates
- **Infrastructure Metrics**: CPU, memory, disk usage
- **Custom Metrics**: Business-specific metrics

### Grafana Dashboards

- **Application Dashboard**: Service health, performance
- **Infrastructure Dashboard**: Cluster resources, node status
- **Business Dashboard**: User activity, business metrics

### Alerting

- **Slack Notifications**: For critical alerts
- **Email Alerts**: For important events
- **PagerDuty**: For on-call notifications

## 🔒 Security Best Practices

### 1. Secrets Management

- Use Kubernetes Secrets for sensitive data
- Rotate secrets regularly
- Use external secret management (AWS Secrets Manager)

### 2. Network Security

- Use private subnets for application pods
- Implement network policies
- Use security groups to restrict access

### 3. Container Security

- Scan images for vulnerabilities
- Use minimal base images
- Implement pod security policies

## 🚨 Troubleshooting

### Common Issues

#### 1. Pods Not Starting

```bash
# Check pod events
kubectl describe pod <pod-name> -n vehicle-rental-prod

# Check pod logs
kubectl logs <pod-name> -n vehicle-rental-prod
```

#### 2. Services Not Accessible

```bash
# Check service endpoints
kubectl get endpoints -n vehicle-rental-prod

# Check ingress status
kubectl describe ingress -n vehicle-rental-prod
```

#### 3. Database Connection Issues

```bash
# Check database connectivity
kubectl exec -it <pod-name> -n vehicle-rental-prod -- nc -zv mongodb-service 27017
```

## 📈 Scaling and Performance

### Horizontal Pod Autoscaling

```bash
# Create HPA for auth service
kubectl autoscale deployment auth-service -n vehicle-rental-prod \
  --cpu-percent=70 --min=2 --max=10
```

### Resource Optimization

- Monitor resource usage
- Adjust resource limits based on actual usage
- Use node affinity for better resource distribution

## 🔄 Backup and Recovery

### Database Backups

- Configure automated backups for DocumentDB
- Test backup restoration procedures
- Store backups in multiple regions

### Application Backups

- Use persistent volumes for data storage
- Implement disaster recovery procedures
- Test recovery procedures regularly

## 📞 Support and Maintenance

### Regular Maintenance

- Update dependencies regularly
- Monitor security patches
- Review and update configurations

### Monitoring and Alerts

- Set up comprehensive monitoring
- Configure appropriate alerting
- Regular review of metrics and logs

---

## 🎯 Next Steps

1. **Set up the infrastructure** using Terraform
2. **Configure GitHub secrets** for CI/CD
3. **Deploy the monitoring stack**
4. **Deploy your application** to Kubernetes
5. **Configure DNS and SSL certificates**
6. **Set up monitoring and alerting**
7. **Test the complete pipeline**

This setup provides you with a production-ready, scalable, and maintainable microservices platform with full CI/CD capabilities! 🚀
