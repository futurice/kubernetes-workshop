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
docker tag $NAME/frontend 172425606708.dkr.ecr.eu-west-1.amazonaws.com/$NAME/frontend
```
- Push an image
```
docker push 172425606708.dkr.ecr.eu-west-1.amazonaws.com/$NAME/frontend
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

We have a secret called `kubernetes-workshop/backend-api-key` in AWS secret manager. This secret can be used as the API key to fetch data from a backend server running at https://kubernetes-workshop-backend.herokuapp.com.

We now try to inject that secret into our frontend, so it can access the backend.

In the end, calling `GET <frontend-url>/api/film-titles?year=<year>` should return a list of film titles for the given year.

### The easy way

The easy way would be to just manually fetch the secret from secret manager, create a Kubernetes secret out of it, and inject that secret as an environment variable to the frontend container.

#### Commands you might need

- Get the secret out of secrets manager
```
aws secretsmanager get-secret-value --secret-id kubernetes-workshop/backend-api-key
```
- Create a Kubernetes secret (**Note**: don't do this in production! Don't put secrets in plain text in your bash history.)
```
kubectl create secret generic backend-api-key --from-literal=key=$SECRET
```
- Use a secret as environment variable in a yaml file
```
name: API_KEY
valueFrom:
  secretKeyRef:
    name: backend-api-key
    key: key
```

### The fancy way

A more advanced way would use a third-party service that can manage secrets automatically. For instance, https://github.com/godaddy/kubernetes-external-secrets

Follow the instructions from the readme there. In order to give the library access to our secrets, the easiest way is to attach a policy to the cluster nodes' role:

  - Go to IAM
  - Find the role starting with `eksctl-$NAME-nodegroup`
  - Attach the policy SecretsManagerReadWrite

You can use `backend-api-key-secret.yaml` as a base configuration.

## Section 3: free experimentation

Here you can do whatever you can think of. Install existing Helm charts. Add volumes. Try running a sidecar inside your pod. Whatever you can think of!
