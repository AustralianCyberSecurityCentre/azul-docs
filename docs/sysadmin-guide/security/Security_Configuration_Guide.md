# Security Configuration Guide

This guide describes how to configure access control, security labels, OpenID Connect authentication, personal access tokens, security presets, and default markings in Azul.

The security configuration is normally defined in the deployment `values.yaml` file under the `security` section.

## Overview

Azul security consists of four main label types:

| Label type | Behaviour | Example |
|---|---|---|
| Classification | Exclusive. A user must possess the classification applied to an object. | `OFFICIAL` |
| Caveat | Exclusive. A user must possess every caveat applied to an object. | `FIREBALL` |
| Releasability | Inclusive. A user must possess at least one releasability label applied to an object. | `REL:AU`, `REL:NZ` |
| Marking | Normally descriptive, but individual markings may be configured to enforce access. | `TLP:AMBER+STRICT` |

A security string combines these labels into a human-readable value, for example:

```text
OFFICIAL REL:AU,NZ TLP:AMBER
```

The application parses and normalises these strings before using them.

Access is granted when:

1. The user possesses every exclusive classification and caveat label.
2. The user possesses at least one releasability label when releasability labels are present.
3. The user possesses at least one applicable marking when the marking has `enforce_security: true`.

Application-level checks are used to determine whether a user should be able to view an object. The primary enforcement mechanism is OpenSearch document-level security, or DLS.

## Security configuration structure

The main configuration structure is:

```yaml
security:
  admin_roles: []

  oidc:
    enabled: false
    authority_url: ""
    client_id: ""
    scopes: ""
    enable_pat: false
    security_index_username: "admin"
    security_index: "security_azul"

  labels:
    classification:
      title: Classification
      options: []

    caveat:
      title: Caveat
      options: []

    releasability:
      title: Releasability
      prefix: "REL:"
      origin: ""
      origin_alt_name: ""
      options: []

    tlp:
      title: TLP
      options: []

  allow_releasability_priority_gte: "0"

  minimumRequiredAccess: []

  default: ""

  presets: []
```

---

# Configuring administrator roles

The `admin_roles` setting defines which roles grant administrative privileges.

A user is treated as an administrator when they possess at least one role listed in `admin_roles`.

Example:

```yaml
security:
  admin_roles:
    - admin
    - azul-administrators
```

Role names must match the role values received from the configured identity provider or authentication mechanism.

Administrator roles should be limited to dedicated administrative groups. Avoid assigning general-purpose user groups as administrator roles.

---

# Configuring OpenID Connect

OpenID Connect can be used to authenticate users through an external identity provider.

Example:

```yaml
security:
  oidc:
    enabled: true
    authority_url: "https://login.example.gov.au/tenant-id/v2.0"
    client_id: "00000000-0000-0000-0000-000000000000"
    scopes: "openid profile email"
    enable_pat: false
    security_index_username: "admin"
    security_index: "security_azul"
```

## `enabled`

Controls whether OIDC authentication is enabled.

```yaml
enabled: true
```

Set this to `false` when OIDC is not being used.

## `authority_url`

The base URL of the OIDC provider.

Do not append:

```text
/.well-known/configuration
```

Azul uses the authority URL to discover the provider configuration.

Example:

```yaml
authority_url: "https://login.example.gov.au/tenant-id/v2.0"
```

## `client_id`

The application or client identifier registered with the OIDC provider.

```yaml
client_id: "00000000-0000-0000-0000-000000000000"
```

The OIDC application registration must include the correct Azul redirect URI for the environment.

## `scopes`

A space-separated list of OIDC scopes.

Example:

```yaml
scopes: "openid profile email"
```

A provider may also require additional scopes such as:

```yaml
scopes: "openid profile email offline_access"
```

Only request scopes required by the deployment.

## Identity-provider role and label mapping

The OIDC provider must return the roles, groups, or claims expected by Azul.

At minimum, users must receive all labels configured under:

```yaml
security:
  minimumRequiredAccess:
```

For the supplied configuration, every user must receive:

```text
OFFICIAL
```

The exact claim mapping is deployment-specific and must be configured consistently between:

- The identity provider.
- The Azul authentication layer.
- The OpenSearch security configuration.
- The label names in `values.yaml`.

---

# Configuring personal access tokens

Personal access tokens can be enabled alongside OIDC.

```yaml
security:
  oidc:
    enabled: true
    enable_pat: true
```

When PAT support is enabled:

- OIDC security must also be correctly configured.
- A JWT signing secret must be present in the metastore credentials.
- The configured OpenSearch account must be able to create and manage the PAT security index.

Example:

```yaml
security:
  oidc:
    enable_pat: true
    security_index_username: "admin"
    security_index: "security_azul"
```

The JWT signing secret is expected to be available as:

```text
jwt_signing_secret
```

in the relevant `metastore-creds` secret.

The `security_index_username` account requires permission to create, read, update, and manage the configured index:

```text
security_azul
```

Do not enable PAT support until the signing secret and index permissions have been verified.

---

# Configuring classifications

Classifications are exclusive access-control labels.

A user must possess the classification assigned to an object before access is allowed.

Example:

```yaml
security:
  labels:
    classification:
      title: Classification
      options:
        - name: OFFICIAL
          priority: "0"
        - name: PROTECTED
          priority: "100"
        - name: SECRET
          priority: "200"
```

## Classification order

Classification options should be listed from least restrictive to most restrictive.

For example:

```yaml
options:
  - name: OFFICIAL
    priority: "0"
  - name: PROTECTED
    priority: "100"
  - name: SECRET
    priority: "200"
```

When multiple classification labels are supplied, Azul retains the most restrictive applicable classification.

## Classification priority

The `priority` value controls:

- The relative security level of the classification.
- Whether releasability labels may be used.
- Whether other labels limited by `min_priority` and `max_priority` may be selected.

Priority values are represented as strings in the YAML configuration:

```yaml
priority: "100"
```

Use a consistent numerical scale across the environment.

---

# Configuring caveats

Caveats are exclusive labels.

When an object has multiple caveats, the user must possess all of them.

Example:

```yaml
security:
  labels:
    caveat:
      title: Caveat
      options:
        - name: FIREBALL
          min_priority: "0"
          max_priority: "1000"
        - name: TRUESTRIKE
          min_priority: "0"
          max_priority: "1000"
```

For an object with:

```text
OFFICIAL FIREBALL TRUESTRIKE TLP:CLEAR
```

the user must possess:

```text
OFFICIAL
FIREBALL
TRUESTRIKE
```

Possessing only one caveat is not sufficient.

## Limiting caveats by classification

The optional `min_priority` and `max_priority` fields restrict the classification levels at which a caveat may be used.

Example:

```yaml
- name: FIREBALL
  min_priority: "100"
  max_priority: "200"
```

This makes the caveat valid only for classifications whose priority falls within the configured range.

---

# Configuring releasability labels

Releasability labels provide inclusive access.

When multiple releasability labels are applied to an object, a user needs at least one matching label.

For example, an object marked:

```text
OFFICIAL REL:AU,NZ TLP:CLEAR
```

can be accessed by a user with either:

```text
REL:AU
```

or:

```text
REL:NZ
```

provided the user also satisfies the exclusive labels.

## Releasability configuration

Example:

```yaml
security:
  labels:
    releasability:
      title: Releasability
      prefix: "REL:"
      origin: "REL:AU"
      origin_alt_name: "AGAO"
      options:
        - name: REL:AU
        - name: REL:NZ
        - name: REL:USA
        - name: REL:GBR
```

## Prefix

Releasability labels must use the configured prefix:

```yaml
prefix: "REL:"
```

Example labels:

```text
REL:AU
REL:NZ
REL:USA
```

When multiple releasability labels are selected, Azul combines them into one rendered group:

```text
REL:AU,NZ,USA
```

Do not configure releasability labels without the expected `REL:` prefix.

## Origin

The `origin` setting identifies the originating releasability group.

Example:

```yaml
origin: "REL:AU"
```

The origin may be automatically included in the user's effective releasability access, depending on the supplied user labels and security processing.

Set this to an empty string when the deployment does not use an origin:

```yaml
origin: ""
```

## Origin alternate name

The `origin_alt_name` provides a display name for the origin when the user filters down to only the origin releasability.

Example:

```yaml
origin_alt_name: "AGAO"
```

This setting affects the displayed security filter label. It does not create an additional access-control label.

---

# Configuring the releasability priority threshold

The following setting controls the classification priority at which releasability labels become available:

```yaml
security:
  allow_releasability_priority_gte: "0"
```

The threshold is inclusive.

For example:

```yaml
allow_releasability_priority_gte: "100"
```

means classifications with a priority of `100` or greater may use releasability labels.

Classifications below the threshold may use TLP markings but cannot use releasability labels.

The configured priority must correspond to the priority scale used by the classification options.

---

# Configuring TLP markings

TLP labels are normally descriptive markings.

Example:

```yaml
security:
  labels:
    tlp:
      title: TLP
      options:
        - name: TLP:CLEAR
        - name: TLP:GREEN
        - name: TLP:AMBER
        - name: TLP:AMBER+STRICT
          enforce_security: true
```

TLP options should be ordered from least restrictive to most restrictive.

When multiple TLP labels are supplied, Azul retains the most restrictive applicable value.

## Enforceable markings

A marking becomes an access-control requirement when it contains:

```yaml
enforce_security: true
```

Example:

```yaml
- name: TLP:AMBER+STRICT
  enforce_security: true
```

For an object marked:

```text
OFFICIAL TLP:AMBER+STRICT
```

a user must possess:

```text
OFFICIAL
TLP:AMBER+STRICT
```

A normal descriptive TLP marking, such as `TLP:GREEN`, does not restrict access unless `enforce_security` is enabled for that option.

Use enforceable markings carefully. Changing a descriptive marking into an enforceable marking may cause existing users to lose access to data.

---

# Configuring minimum required access

The `minimumRequiredAccess` list defines labels that every user must possess to access Azul.

Example:

```yaml
security:
  minimumRequiredAccess:
    - OFFICIAL
```

A user who does not possess every label in this list is denied access to the system.

Each minimum-required label must also exist in either:

- The classification or caveat label sets.
- The releasability label set.

If a configured minimum-required label is not defined as an exclusive or inclusive label, the security configuration will fail validation during application initialisation.

Example with multiple requirements:

```yaml
minimumRequiredAccess:
  - OFFICIAL
  - REL:AU
```

This configuration requires every user to possess both labels before any user-specific denylist processing is applied.

Avoid adding optional caveats or narrowly assigned groups to `minimumRequiredAccess`.

---

# Configuring default security

The `default` value is applied to plugins or events that do not provide their own security information.

Example:

```yaml
security:
  default: OFFICIAL TLP:CLEAR
```

The default should represent the least restrictive valid security string allowed by the deployment.

The default must not be empty.

At application startup, Azul validates and normalises this value. An unset or invalid default causes a security configuration error.

Restricted plugins and data sources should explicitly apply their required security string rather than relying on the default.

Recommended baseline:

```yaml
default: OFFICIAL TLP:CLEAR
```

---

# Configuring security presets

Presets are pre-defined security strings presented to users.

Example:

```yaml
security:
  presets:
    - OFFICIAL TLP:AMBER+STRICT
    - OFFICIAL TLP:AMBER
    - OFFICIAL TLP:GREEN
    - OFFICIAL TLP:CLEAR
```

Presets may also contain caveats and releasability labels:

```yaml
presets:
  - OFFICIAL REL:AU TLP:CLEAR
  - OFFICIAL REL:AU,NZ TLP:AMBER
  - OFFICIAL FIREBALL REL:AU TLP:AMBER+STRICT
```

At startup, each preset is parsed and normalised.

A user is only shown presets that they are authorised to use. For example, a user without `FIREBALL` should not be offered a preset requiring `FIREBALL`.

All labels referenced by presets must be defined in the corresponding label configuration.

---

# Complete baseline example

The following example provides a minimal configuration using `OFFICIAL` and the four standard TLP values:

```yaml
security:
  admin_roles:
    - admin

  oidc:
    enabled: false
    authority_url: ""
    client_id: ""
    scopes: ""
    enable_pat: false
    security_index_username: "admin"
    security_index: "security_azul"

  labels:
    classification:
      title: Classification
      options:
        - name: OFFICIAL
          priority: "0"

    caveat:
      title: Caveat
      options: []

    releasability:
      title: Releasability
      prefix: "REL:"
      origin: ""
      origin_alt_name: ""
      options: []

    tlp:
      title: TLP
      options:
        - name: TLP:CLEAR
        - name: TLP:GREEN
        - name: TLP:AMBER
        - name: TLP:AMBER+STRICT
          enforce_security: true

  allow_releasability_priority_gte: "0"

  minimumRequiredAccess:
    - OFFICIAL

  default: OFFICIAL TLP:CLEAR

  presets:
    - OFFICIAL TLP:AMBER+STRICT
    - OFFICIAL TLP:AMBER
    - OFFICIAL TLP:GREEN
    - OFFICIAL TLP:CLEAR
```

---

# Example configuration with releasability and caveats

```yaml
security:
  admin_roles:
    - azul-administrators

  oidc:
    enabled: true
    authority_url: "https://login.example.gov.au/tenant-id/v2.0"
    client_id: "00000000-0000-0000-0000-000000000000"
    scopes: "openid profile email"
    enable_pat: true
    security_index_username: "azul-security-admin"
    security_index: "security_azul"

  labels:
    classification:
      title: Classification
      options:
        - name: OFFICIAL
          priority: "0"
        - name: PROTECTED
          priority: "100"

    caveat:
      title: Caveat
      options:
        - name: FIREBALL
          min_priority: "0"
          max_priority: "100"
        - name: TRUESTRIKE
          min_priority: "0"
          max_priority: "100"

    releasability:
      title: Releasability
      prefix: "REL:"
      origin: "REL:AU"
      origin_alt_name: "AGAO"
      options:
        - name: REL:AU
        - name: REL:NZ
        - name: REL:USA
        - name: REL:GBR

    tlp:
      title: TLP
      options:
        - name: TLP:CLEAR
        - name: TLP:GREEN
        - name: TLP:AMBER
        - name: TLP:AMBER+STRICT
          enforce_security: true

  allow_releasability_priority_gte: "0"

  minimumRequiredAccess:
    - OFFICIAL

  default: OFFICIAL REL:AU TLP:CLEAR

  presets:
    - OFFICIAL REL:AU TLP:CLEAR
    - OFFICIAL REL:AU,NZ TLP:GREEN
    - OFFICIAL REL:AU,USA,GBR TLP:AMBER
    - PROTECTED FIREBALL REL:AU TLP:AMBER+STRICT
```

---

# Access-control examples

## Exclusive classification

Object:

```text
OFFICIAL TLP:CLEAR
```

User labels:

```text
OFFICIAL
TLP:CLEAR
```

Result:

```text
Access allowed
```

A user without `OFFICIAL` is denied access.

## Multiple caveats

Object:

```text
OFFICIAL FIREBALL TRUESTRIKE TLP:CLEAR
```

User labels:

```text
OFFICIAL
FIREBALL
TLP:CLEAR
```

Result:

```text
Access denied
```

The user is missing `TRUESTRIKE`.

## Inclusive releasability

Object:

```text
OFFICIAL REL:AU,NZ TLP:CLEAR
```

User labels:

```text
OFFICIAL
REL:NZ
TLP:CLEAR
```

Result:

```text
Access allowed
```

Only one matching releasability label is required.

## No matching releasability

Object:

```text
OFFICIAL REL:AU,NZ TLP:CLEAR
```

User labels:

```text
OFFICIAL
REL:USA
TLP:CLEAR
```

Result:

```text
Access denied
```

The user does not possess either `REL:AU` or `REL:NZ`.

## Enforceable TLP marking

Object:

```text
OFFICIAL TLP:AMBER+STRICT
```

User labels:

```text
OFFICIAL
TLP:AMBER
```

Result:

```text
Access denied
```

Because `TLP:AMBER+STRICT` has `enforce_security: true`, the user must possess the enforceable marking.

# Troubleshooting

## User is denied access to Azul

Check:

1. The user possesses every label in `minimumRequiredAccess`.
2. The identity provider is returning the expected claims.
3. The role or group claim is being mapped correctly.
4. Label spelling and capitalisation match `values.yaml`.
5. The user's account has not been removed by an identity-provider denylist.
6. The application has loaded the current configuration.

A missing minimum-required label results in an access exception before optional denylist processing occurs.

## User can log in but cannot see expected data

Check:

- The object's classification.
- All caveats applied to the object.
- The object's releasability labels.
- Enforceable markings.
- The user's effective security labels.
- OpenSearch DLS roles and queries.

## User sees an unexpected preset

Confirm that:

- The preset contains only valid labels.
- The user has all exclusive labels required by the preset.
- The user has at least one matching inclusive label.
- The user has any enforceable marking required by the preset.

## Application fails during startup

Common causes include:

- `security.default` is empty.
- A minimum-required label is not defined.
- A preset contains an unknown label.
- A label uses the wrong prefix.
- A classification priority is missing or invalid.
- YAML indentation is incorrect.
- A value expected as a string was supplied using an incompatible YAML type.

Render the Helm chart with debugging enabled:

```bash
helm template <release-name> <chart-directory> \
  -f values.yaml \
  -n <namespace> \
  --debug
```

## PAT creation fails

Check:

- `enable_pat` is set to `true`.
- OIDC is enabled and operational.
- `jwt_signing_secret` exists in `metastore-creds`.
- The configured security index exists or can be created.
- `security_index_username` has appropriate OpenSearch permissions.
- The application can connect to OpenSearch.
- The security index name matches the deployed environment.

## User has releasability but is still denied

Possessing a releasability label does not override exclusive requirements.

For example, a user with:

```text
REL:AU
```

cannot access:

```text
PROTECTED REL:AU TLP:CLEAR
```

unless the user also possesses:

```text
PROTECTED
```

The user must satisfy the classification, all caveats, at least one releasability label, and any enforceable marking.

---
