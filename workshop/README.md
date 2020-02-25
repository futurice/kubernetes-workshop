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
eksctl create cluster --name=kubernetes-workshop-$NAME --nodes=3 --managed --alb-ingress-access --region=eu-west-1
```

## Section 1: get familiar with the tools

## Section 2: secret management

## Section 3: free experimentation
