# Configuring Azul

Next, you want to configure Azul's core. This requires linking in OpenSearch and
other dependencies as required.

There are example values in `azul-app/azul/example-values.yaml` for how you might
configure a typical Azul deployment. Store your own `values.yaml` in a Git repository
somewhere that you deploy with a GitOps provider (e.g. ArgoCD).

## Authentication/Authorisation

You'll need to plug in an appropriate OIDC provider into OpenSearch and Azul.

Follow the official OpenSearch documentation to configure OpenSearch with the OIDC provider.

See [this page](../component-config/security_opensearch.md) for example keycloak configuration.

### Azul Configuration for OIDC Provider

Azul needs to be configured to redirect users to the OIDC provider for the OIDC flow to work correctly.

| Entry in values.yaml          | Description                  | Example                                       |
| ----------------------------- | ---------------------------- | --------------------------------------------- |
| `security.oidc.enabled`       | do oidc stuff                | true                                          |
| `security.oidc.authority_url` | url to root of oidc provider | https://login.microsoftonline.com/MY_ID/v2.0/ |
| `security.oidc.client_id`     | oidc client id               | web                                           |
| `security.oidc.scopes`        | oidc scope request           | openid profile email offline_access           |

### Opensearch Azul Role Configuration

For Azul user access, additional opensearch configuration is needed.

See [this page](../component-config/security_opensearch.md) for more information about configuring Azul access control through opensearch.

For Keycloak, refer to the [Azul-specific Keycloak documentation](../component-config/security_keycloak.md).

For Minio, consider setting up age-off in [the Minio age-off documentation](../component-config/minio_ageoff.md).

Usage of KEDA (via the `azul-scaler`), network policies and the like are documented
in values files in this repo.
