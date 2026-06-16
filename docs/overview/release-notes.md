---
sidebar_position: 3
---

# Release Notes

## 11.1.0

Version 11.1.0 adds some fixes for the infrastructure deployment of azul as well as fixes for git-sync when using ssh.

## azul-app

### infra

- infra for opensearch and kafka have been upgraded to work with the latest version of strimzi and the opensearch operator.
- installation docs have been improved to make the readme for infra available through the azul-docs.

#### fixes

- git-sync was failing when using ssh as the auth method. This has been fixed in the chart.

## Plugins

### Maco

azul-plugin-maco was updated to use the newest version of maco (1.3.1)

## 11.0.0

Version 11.0 introduces new core features, focusing on enhanced capabilities and improved ease of use through the Azul UI.

Improvements include:

### Core

#### azul-app

- Added a liveness check for all plugins.

#### audit-forwarder

- Added dynamic windowing to better handle bursts of logs.
- Included additional information in the log format.

#### metastore/restapi

- Added `docand` grammar to enable more precise searches  
  (e.g searching for `depth:0 DOCAND source:"testing"` it ensures the depth is actually 0 with the source and not just that a binary has depth 0 somewhere and testing somewhere)
- Introduced entropy similarity, enabling searches for similar binaries based on entropy graphs  
  (disabled by default due to potential crashes in older OpenSearch clusters using the FAISS plugin).
- Fixed an issue where plugin features and statuses were not always from the latest plugin version.
- Added an API to find common strings between two binaries.
- Introduced a download API, allowing users to request hash downloads via plugins.

#### azul-dispatcher

- Added a `maxSecurity` filter to prevent plugins from collecting jobs above a specified classification level.

#### azul-client

- Improved help information to make the client more user friendly.
- Updated to match the API that renamed `similar` to `similar_feature`.

#### azul-java-client

- Introduced a new Java client with a minimal interface, enabling Java users to interact with Azul via the Rest API.

#### azul-runner

- Git synchronization is now fully managed within azul-runner and no longer handled by a git-sync sidecar.
- Added a continuously updated liveness check file to detect when the runner stops functioning and reboot a pod.

#### azul-security

- Added new restriction settings for caveats: `min_priority` and `max_priority`, limiting which classification caveats can appear with, which prevents invalid classifications.
- Improved the value displayed by max-security to ensure users know the actual maximum classification.

### Demo

- Fixed multiple issues affecting broken components.

### Retrohunt

- Integrated with the Rest API.
- Now available in the Azul Web UI (under the Binaries dropdown).
- Fixed numerous bugs related to hunt creation, deletion, and maintenance.

### Plugins

- **jadx**
  - New plugin using JADX to decompile `.apk` and `.dex` files.
  - Generates features.
  - Decompiles and renders non-core Java libraries for associated binaries (similar to the .NET plugin).

- **image-convert**
  - Now converts images to WebP instead of PNG and added support for processing all frames in GIFs.

- **maco**
  - Added new features.
  - Replaced `yara-python` with `yara-x`.
  - The running maco version is now displayed in configuration information.

- **yara**
  - Fixed an issue where events became too large due to the `info` field storing all features.
  - Now returns rule hits with results.

- Updated shared plugin libraries, including:
  - pdftools  
  - ghidra  
  - unbox  
  - netinfo  
  - script-decoder  
  - mandiant-capa  

### UI

- Added GIF display with step controls (forward and backward navigation).
- Included additional text during loading screens.
- Simplified the security picker to display only permissible classifications (hiding TLP, REL, and caveats as appropriate).
- Fixed an issue when rendering similar features for parent objects.
- Displays YARA rule hits in the "Data" view.
- Significantly improved the binary comparison page, including string comparison when exactly two binaries are selected.
- Fixed an issue where an empty JWT could be sent to the Rest API under certain conditions.
- Added the ability to request SHA256 downloads from all Azul download plugins.

## 10.0.0

10.0 introduces several new features based on user feedback and removes a number of legacy model components that are no longer required.

Improvements include:

### Core

- Added support for Personal Access Token (PAT) authentication for administrators, enabling easier system-to-system integrations.
- Added configuration options to control Kafka `consumerGroup` expiry, allowing users to avoid unnecessary message reprocessing.
- Updated error message format to include an enum value for clearer and more consistent error identification.
- Expanded Helm chart configuration options for more configurable logging.
- Enhanced backup functionality with support for AWS S3 storage and additional authentication methods.
- Added configuration options for auditing and audit forwarding.

#### azul-client
- Implemented client-side locking, allowing safe use in multiprocessing and multi-threaded applications.
- Added a new command for simplified file downloads: `azul download <sha256>`.

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
  - Added extraction of ja4 features.
 
- **retrohunt**
  - Now uses redis for message transfer between server and worker to make jobs more reliable.

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
