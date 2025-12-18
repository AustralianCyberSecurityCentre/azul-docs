# Prerequisites

:::tip

This page has a lot of possible prerequisites but don't panic - most of these have example
deployments.

:::


You need the following in order to install Azul:

- A Kubernetes cluster
    - 30GB+ of RAM is recommended
      - Azul by default deploys Kafka and OpenSearch in a multi-node configuration and
        subsequently these dependencies consume a decent amount of RAM.
      - In resource-constrained environments single-node configurations may work though
        these are not well tested (and come with risks to data).
    - Privileges to install Custom Resource Definitions (CRDs)
    - Kubernetes implementations in practice can enforce various constraints (from e.g. CNI
      providers) - choose wisely
      - We have tested the following with success:
        - Bare metal/"vanilla" Kubernetes (likely includes distros like [K3s](https://k3s.io/)
          though that isn't tested)
        - [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/) (EKS)
        - [Microsoft Azure Kubernetes Service](https://azure.microsoft.com/en-au/products/kubernetes-service) (AKS)
      - Other implementations, such as Red Hat OpenShift are not well tested.
    - A suitable ingress controller
      - Azul currently uses Ingress objects, the Gateway API may be supported in future.
      - We recommend [ingress-nginx](https://github.com/kubernetes/ingress-nginx).

Additionally, you will need the following (**there are example deployments included** with
Azul to make this easier):

- GitOps tool for Helm chart deployment
  - You almost certainly need continuous deployment for Azul's charts to avoid manual work (it
    is possible to deploy manually with Helm, however).
  - We recommend [ArgoCD](https://argo-cd.readthedocs.io/en/stable/). Flux is untested but should work.
- S3(-compatible) storage or Azure Blob Storage
  - We recommend the use of cloud-native storage where possible. [Minio](https://www.min.io/)
    and [Ceph](https://ceph.io/en/) have also been tested, and other implementations are likely
    to work.
  - A Minio deployment is included as an example, though this is not production-ready.
- An OpenID Connect (OIDC) provider
  - OpenID Connect implementations vary in quality and can impact their usefulness for a
    system like Azul.
  - We **strongly recommend** the use of a hosted solution like Entra ID for this, or for a
   well-maintained/understood system to be deployed for this purpose.
  - [Keycloak](https://www.keycloak.org/) is known compatible and is also well tested, though
    you must verify that this meets your security needs.
  - Amazon Cognito and other commercial OIDC providers isn't tested and your mileage may vary.
- [OpenSearch](https://opensearch.org/) cluster
  - Azul stores search metadata in OpenSearch; this is what user queries hit and is where
    results are indexed.
  - We **only support** OpenSearch 3.0+. We rely on OpenSearch-specific functionality and 
    subsequently ElasticSearch is not supported.
  - The included Azul Infra OpenSearch cluster relies on the OpenSearch K8S Operator which
    mandates multi-node deployments (i.e 3+). This tutorial will guide you on how to deploy
    this. You can also bring your own cluster from elsewhere, though make sure the OpenSearch
    Security plugin is enabled.
  - At this stage the use of Amazon OpenSearch Service clusters is not recommended - Amazon's
    platform requires the use of Cognito for OIDC and manually hacking JWTs is probably not
    worth it. Other managed OpenSearch providers may work but have not been tested.
- [Kafka](https://kafka.apache.org/) cluster
  - Azul uses Kafka for event management in order to distribute events between components
    of the system.
  - The included Kafka cluster relies on the [Strimzi](https://strimzi.io/) operator. This 
    tutorial will guide you  on how to deploy this. You can also bring your own cluster from 
    elsewhere and it should generally work fine.

Some additional optional dependencies:

- [cert-manager](https://cert-manager.io/)
  - This is useful if you are using Azul's default OpenSearch cluster as we use cert-manager
    for generating SSL certificates.
- [KEDA](https://keda.sh/)
  - KEDA is not required, but enables dynamic scaling of Azul plugins depending on system
    workload.
  - Unless you are expecting big spikes in system processing, you likely don't need this.
- [Kyverno](https://kyverno.io/)
  - Kyverno is useful for security purposes for enforcing various policies, particularly in
    terms of image verification.
  - This isn't needed and will require additional configuration for your environment.
- Monitoring (Grafana, Prometheus, Loki, prometheus-blackbox-exporter and prometheus-pushgateway)
  - Monitoring an Azul deployment is important to ensure system health is well understood.
  - We use kube-prometheus-stack and individual deployments for the remainder, though separate
    deployments of these will also work fine.
- Overlay network (e.g. Istio, Linkerd)
  - Azul does not use TLS inside the cluster for communications (for simplicity reasons primarily);
    consider deploying an overlay network that supports mutual TLS.

When working through this documentation, it will likely be useful to also refer to the
Helm chart [documentation](https://github.com/AustralianCyberSecurityCentre/azul-app) for Azul.
