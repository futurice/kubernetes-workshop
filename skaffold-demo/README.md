# Installation

[https://skaffold.dev/docs/install/](https://skaffold.dev/docs/install/)

`brew install skaffold`

# Running skaffold in dev move

`skaffold init` to create initial skaffold config.

`skaffold dev --port-forward` to run and keep watching files.

# Deploying to EKS cluster

`aws eks update-kubeconfig --name kube-demo`

`aws ecr get-login --no-include-email | bash`

`skaffold config set default-repo <AWS_ACCOUNT_ID>.dkr.ecr.eu-west-1.amazonaws.com`

`skaffold run`


Example app from: https://github.com/GoogleContainerTools/skaffold/tree/master/examples
