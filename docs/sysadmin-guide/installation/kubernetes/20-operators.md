# Deploying Operators

*These instructions broadly mirror what is available in azul-app/infra - refer to there
if you get stuck!*

## OpenSearch

*If you are bringing your own OpenSearch cluster, skip this step! Specific info for configuring
OpenSearch comes later.*

First, we need to deploy a [Kubernetes Operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) to deploy OpenSearch for us. An operator is something which
works automonously to deploy an application or functionality in Kubernetes for you - we
want this for OpenSearch because otherwise there deploying a multi-node cluster from
scratch will be difficult!

In this case, OpenSearch provide the [OpenSearch Kubernetes Operator](https://github.com/opensearch-project/opensearch-k8s-operator).

This is simple to deploy using [Helm](https://helm.sh/) (copied from their install directions):

```bash
helm repo add opensearch-operator https://opensearch-project.github.io/opensearch-k8s-operator/
helm install opensearch-operator opensearch-operator/opensearch-operator
```

To optionally harden this operator, you can specify Helm values to the operator. For example:

```yaml
securityContext:
  allowPrivilegeEscalation: false
  # ...

manager:
  securityContext:
    allowPrivilegeEscalation: false
    # ...

kubeRbacProxy:
  enable: false
```

## Kafka

*If you are bringing your own Kafka cluster, skip this step!*

The Strimzi documentation has a variety of [deployment options](https://strimzi.io/docs/operators/latest/deploying)
for the operator, but the following should suffice:

```bash
wget "https://strimzi.io/install/latest?namespace=kafka" -O strmzi.yaml
kubectl create namespace kafka
kubectl create -f strmzi.yaml -n kafka
```

If you have no need for cluster hardening, you can now move on to the next step.

To optionally harden Strimzi, you can apply securityContext settings to containers in the 
Deployment in the above .yaml - e.g. `allowPrivilegeEscalation=false`.

## KEDA (optional)

*If you don't need autoscaling, skip this step!*

We recommend deploying [KEDA with Helm](https://keda.sh/docs/2.17/deploy/#helm) - e.g.:

```bash
helm repo add kedacore https://kedacore.github.io/charts 
helm repo update
helm install keda kedacore/keda --namespace keda --create-namespace
```

## Kyverno (optional)

*If you don't need Kubernetes policies, skip this step!*

Double check that your Kubernetes cluster is the right version with [Kyverno's compatibility matrix](https://kyverno.io/docs/installation/#compatibility-matrix) first.

We recommend deploying [Kyverno with Helm](https://kyverno.io/docs/installation/methods/#standalone-installation) - e.g.:

```bash
helm repo add kyverno https://kyverno.github.io/kyverno/
helm repo update
helm install kyverno kyverno/kyverno --namespace kyverno --create-namespace
```

## Next Steps

Now that we have our operators deployed, we can move on to the next step, building our
infrastructure configurations.
