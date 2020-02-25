# Kubernetes workshop

In this workshop we are going to experiment a bit with Kubernetes. The workshop consists of three sections: a basic part to get familiar with the tools, a more realistic part where we install a third-party library for secret management, and a free-form part where you can experiment more with the cluster.

## Setting up the environment

Everyone needs a Kubernetes cluster. If you already have a clean cluster (Minikube or a namespace in an existing cluster, for instance) that is fine. Otherwise, follow these steps to create a cluster in our demo account:

1. Log in to our AWS account: https://futuk8s.signin.aws.amazon.com/console (ask for credentials)
2. Go to Cloud9: https://eu-west-1.console.aws.amazon.com/cloud9/ide/b10a9e30ab124064a3975dcd18c01112
3. Create a new terminal tab. Don't close any other tabs! We're sharing this session.
4. Create a unique identifier for yourself and create a working directory:
```
export NAME=<my-unique-name>
mkdir $NAME && cd $NAME
```
5. Clone this repository
```
git clone https://github.com/futurice/kubernetes-workshop
```
6. Create a Kubernetes cluster using eksctl:
```
export KUBECONFIG=~/environment/$NAME/.kube/config
eksctl create cluster --name=$NAME --nodes=3 --managed --alb-ingress-access --region=eu-west-1
```

## Section 1: get familiar with the tools

Goal: try to get the frontend service running and check that the root path (`/`) returns "Hello world!".

### Commands you might need

#### Docker

- Create a docker registry
```
aws ecr create-repository --repository-name $NAME/frontend
```
- Build a docker container
```
docker build -t $NAME/frontend .
```
- Tag an image
```
docker tag futuk8s.dkr.ecr.eu-west-1.amazonaws.com/$NAME/frontend
```
- Push an image
```
docker push futuk8s.dkr.ecr.eu-west-1.amazonaws.com/$NAME/frontend
```

#### Kubernetes

- Apply the kubernetes manifest
```
kubectl apply -f manifest.yaml
```
- Get all services in the cluster
```
kubectl get services
```
- Get all pods in the cluster
```
kubectl get pods
```
- See details of a certain pod
```
kubectl describe pod <ID>
```
- See logs of a certain pod
```
kubectl logs <ID>
```
- Delete a pod
```
kubectl delete pod <ID>
```

## Section 2: secret management

## Section 3: free experimentation
