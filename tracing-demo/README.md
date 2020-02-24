# Tracing demo

In this demo we will deploy 3 services and X-Ray daemon processes into a Kubernetes cluster to see how tracing ends up in the X-Ray UI.

## Prerequisites

- An EKS cluster is running and `kubectl` set up
- The cluster nodes have rights to write to X-Ray

## Build docker and push to registry

- Create a container registry for xray
```
$ npm run create-registry-xray
```
- Build the docker container for xray and push it to the registry
```
- Create a container registry for service a
```
$ npm run build-and-push-xray
```
$ npm run create-registry-a
```
- Build the docker container for service a and push it to the registry
```
$ npm run build-and-push-service-a
```
- Create a container registry for service b
```
$ npm run create-registry-b
```
- Build the docker container for service b and push it to the registry
```
$ npm run build-and-push-service-b
```

## Deploy everything to Kubernetes

kubectl apply -f deployment.yaml

## Check the public address for service-1

```
kubectl get services -o json | jq -r '.items[] | select(.metadata.name=="service-1") | .status.loadBalancer.ingress[0].hostname'
```

## Make a couple of call to the root endpoint and check the X-Ray console

https://eu-west-1.console.aws.amazon.com/xray/home?region=eu-west-1#/service-map

## Acknowledgements

This demo is heavily inspired by this AWS sample: https://github.com/aws-samples/aws-xray-kubernetes
