# Infrastructure Configuration

*If you have brought all your own dependencies, skip this page!*

## Overview

Next, we want to template out our configuration for configuring Azul's infrastructure.

Azul includes a [Helm](https://helm.sh) chart which contains deployments of most
common Azul requirements. Each component is individually configurable and you can
deploy **none, some or all** of the example components.

This is included in the `infra/` folder in [azul-app](https://github.com/AustralianCyberSecurityCentre/azul-app).

First, look at the default `values.yaml` file in this folder - for example, it contains:

```yaml
minio:
  # Main instance, used to store files
  main:
    enable: true
    # ...
```

Refer to the `README.md` in `infra/` for more specific guidance on how to configure this
for the specific Azul version you are deploying.

You should develop your own overrides to configure this for your own environment (i.e store
a .yaml file in a Git repository). There are a large suite of values documented in this 
file which you will need to explore.

:::tip

Make sure to disable components that you don't need!

For example, if you have your own S3/Azure Blob Storage, disable both the `main` and 
`backup` instances with:

```yaml
minio:
  main:
    enable: false
  backup:
    enable: false

```

:::

## Deploying

Now that you have a your infrastructure chart configured, deploy this using
ArgoCD or your preferred Helm deployment mechanism into a namespace associated
with your Azul deployment (e.g. `azul-infra`). Make sure that all components
come up.

## Next Steps

Now that you have core dependencies up, we can move on to getting the
application itself configured.
