# Deploying/Updating Operators

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

### Install
```bash
helm repo add opensearch-operator https://opensearch-project.github.io/opensearch-k8s-operator/
helm install opensearch-operator opensearch-operator/opensearch-operator
```

### Update
#### 1. Check the current version
```bash
helm list -n <your-namespace>
```

Expected output should show something similar to:
```text
opensearch-operator    default    7    deployed    opensearch-operator-3.0.2    3.0.0-alpha
```

#### 2. Update Helm Repository

```bash
helm repo add opensearch-operator https://opensearch-project.github.io/opensearch-k8s-operator/
helm repo update
```

Check available versions:

```bash
helm search repo opensearch-operator/opensearch-operator --versions
```

#### 3. Verify Existing Values

Check for custom values:

```bash
helm get values opensearch-operator -n <your-namespace>
```

If this returns:

```yaml
null
```

there are no user-supplied values and the upgrade can proceed using chart defaults.

#### 4. Perform a Dry Run

```bash
helm upgrade opensearch-operator \
  opensearch-operator/opensearch-operator \
  --version <new-version> \
  -n default \
  --dry-run
```

Optional: save rendered manifests for comparison:

```bash
helm get manifest opensearch-operator -n default > current.yaml

helm template opensearch-operator \
  opensearch-operator/opensearch-operator \
  --version 3.0.14 \
  -n <your-namespace> > new.yaml
```

Compare:

```bash
diff -u current.yaml new.yaml
```

Focus on:

- Operator image version
- Deployment arguments
- CRDs
- Webhook configuration

---

#### 5. Verify Existing CRDs

Ensure both API groups exist:

```bash
kubectl get crd | grep opensearch
```

Expected to include both:

```text
*.opensearch.opster.io
*.op*nsearch.org
```

---

#### 6. Verify Webhook Certificates

```bash
kubectl get certificate -n <your-namespace>
kubectl get issuer -n default
```

Ensure these are present and Ready:

```text
opensearch-operator-serving-cert
opensearch-operator-selfsigned-issuer
```

---

#### 7. Upgrade the Operator

```bash
helm upgrade opensearch-operator \
  opensearch-operator/opensearch-operator \
* --version <new-version> \
  -n <your-namespace>
```

Expected:

```text
STATUS: deployed
REVISION: 8
```

---

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
