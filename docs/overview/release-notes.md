---
sidebar_position: 3
---

# Release Notes


## 10.0.0

10.0 introduces several new features based on user feedback and removes a number of legacy model components that are no longer required.

Improvements include:

### Core

- Added support for Personal Access Token (PAT) authentication for administrators, enabling easier system-to-system integrations.
- Implemented client-side locking, allowing safe use in multiprocessing and multi-threaded applications.
- Added a new command for simplified file downloads: `azul download <sha256>`.
- Added configuration options to control Kafka `consumerGroup` expiry, allowing users to avoid unnecessary message reprocessing.
- Updated error message format to include an enum value for clearer and more consistent error identification.
- Expanded Helm chart configuration options for more configurable logging.
- Enhanced backup functionality with support for AWS S3 storage and additional authentication methods.
- Added configuration options for auditing and audit forwarding.

### Demo

- Updated the Azul demo to support `docker-compose` deployments to allow users to try out Azul.

### Plugins

- **Alphabets**
  - Include offset and size information for extracted alphabets.

- **maco**
  - Improved startup performance by using the `pip` install cache.

- **floss**
  - Fixed an out‑of‑memory issue caused by temporary file accumulation.

- **netinfo**
  - added extraction of ja4 features.

### UI

- Added a slider to the relational graph, enabling users to adjust the number of parent/related nodes displayed and reduce visual clutter.
- Simplified selection controls when viewing binary features.
- Existing tags now appear in a list when tagging binaries or features.
- Strings can now be loaded for an entire file, removing the previous 10 MiB limit.
- Hovering over hex characters in the hex view now jumps the strings view to the corresponding string.
- Improved layout for the binaries list on the Explore page, particularly for wide screens.

## 9.0.0

9.0 is our first open-source release of Azul. This represents a significant body of work to
prepare the application for public release. As we work through improving the application, we
appreciate any feedback or bugs. Please lodge these at [https://github.com/AustralianCyberSecurityCentre/azul](https://github.com/AustralianCyberSecurityCentre/azul).

Over past releases, this release is primarily a bug-fix release but features overhauls and
improvements to Azul plugins and the UI.

### Core

- Improvements to network policies and fixes for system health monitoring.
- Support for configuring topology spread constraints and pod disruption budgets.
- Pip/uv settings now configurable as part of the Helm chart.
- Unification of stream handling in core Azul components to better unify handling of S3
  or other storage backends.
- Tested support for istio.
- Support for AWS in the audit-forwarder component, and various other fixes.
- Tweaks to make dispatcher and runner more resilient.
- Improved security handling in various system components.

### Infra

- Improvements to network policies and fixes for system health monitoring.
- Support for configuring topology spread constraints.
- Support for configuring Kafka rack topology settings.

### Plugins

- Add a Ghidra plugin to enable more future options for analysis. This currently emits
  the pseudo-C code of supported files as a view in Azul.
- Python plugin has been reworked and combined into the one plugin.
- Report feeds plugin has been added.
- de4dot
    - Upgraded to .NET 8
- dotnet-decompiler
    - Upgraded to .NET 10
- maco
    - Better support for setting features on child binaries.
- tika
    - Now supports larger outputs from Tika.

### UI

- Dependency upgrades.
- Added a multi-feature pivot option to enable analysts to drill down on specific
  combinations of features. This is accessible from a binaries features page. Feedback
  appreciated for this!
- Added an indicator of an ongoing operation while uploading a file.
- Fixes to tooltips falling off the page, table rendering.
- General cleanup.
