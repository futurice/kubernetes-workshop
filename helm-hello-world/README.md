# Helm demo

Deploy a very simple hello-world service using Helm.

## Prerequisites

- An EKS cluster is running and `kubectl` set up
- Helm is installed

## Steps

Just run this command to start a publicly accessible "Hello world" endpoint:

```
helm install --set account=$ACCOUNT -f ./chart/values.yaml hello-world ./chart
```
