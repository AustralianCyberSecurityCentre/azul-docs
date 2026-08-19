# Changelog for Core Azul Libraries

| Date       | Repository     | Title                                                                                                |
| ---------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| 2026-08-19 | app                  | feat: add seaweed support to the infra chart ..100. |
| 2026-08-18 | webui                | feat: add groupings to feature buttons. ..283.     |
| 2026-08-18 | metastore            | feat: disable unused features during indexing. ..69. |
| 2026-08-17 | webui                | fix: hex view page count ..276.                    |
| 2026-08-13 | app                  | feat: retrohunt env changes ..98.                  |
| 2026-08-12 | metastore            | feat: removing un.used fields. ..67.               |
| 2026-08-12 | client               | feat: add api key based auth. ..45.                |
| 2026-08-12 | backup               | fix: skip existing stream bug. ..89.               |
| 2026-08-10 | backup               | fix: bad listing recovery. ..87.                   |
| 2026-08-07 | backup               | feat: add more resillience and retries to listing and event restore. ..85. |
| 2026-08-07 | webui                | fix: searching when tag is selected. ..268.        |
| 2026-08-07 | bedrock              | feat: add s3 list settings. ..126.                 |
| 2026-08-06 | bedrock              | feat: allow for listing errors. ..125.             |
| 2026-08-06 | backup               | feat: only restore a file if it isn.t already in dispatcher. ..84. |
| 2026-08-06 | backup               | feat: better stats and logging. ..83.              |
| 2026-08-06 | bedrock              | feat: allow S3 transport settings to be configurable. ..124. |
| 2026-08-05 | metastore            | fix: ensure tag count is consistenet on the binary. ..66. |
| 2026-08-05 | backup               | feat: discard directories on restore. ..82.        |
| 2026-08-05 | backup               | fix: try and make restore more resillient and work faster. ..81. |
| 2026-08-04 | runner               | fix: remove un.used imports. ..74.                 |
| 2026-08-04 | app                  | release azul.12.0.0                                |
| 2026-08-04 | app                  | release azul.12.0.0.rc1                            |
| 2026-08-03 | backup               | feat: allow for enabling of aes encryption. ..76.  |
| 2026-08-03 | webui                | fix: resolve OIDC service loading when OIDC disabled ..267. |
| 2026-08-03 | bedrock              | fix: guarantee aes extension on checks. ..123.     |
| 2026-08-03 | app                  | feat: allow increase in backup.restore tmp size. ..99. |
| 2026-07-31 | bedrock              | fix: aes when it recieves files that don.t fill buffer. ..118. |
| 2026-07-31 | stats                | feat: enable ty. upgrade uv.lock ..37.             |
| 2026-07-29 | bedrock              | fix: hide keys ..117.                              |
| 2026-07-29 | app                  | feat: enable aes encryption for backup. ..97.      |
| 2026-07-29 | webui                | feat: fix no longer in azul message ..258.         |
| 2026-07-28 | runner               | fix: download plugin fetching. ..72.               |
| 2026-07-28 | metastore            | fix: items not item ..65.                          |
| 2026-07-28 | metastore            | fix: binary counts in certain circumstances. ..64. |
| 2026-07-28 | metastore            | feat: improve performance of implicit queries. ..63. |
| 2026-07-28 | smart-string-filter  | feat: enable ty. upgrade uv.lock ..36.             |
| 2026-07-28 | restapi-server       | feat: enable ty. upgrade uv.lock ..72.             |
| 2026-07-28 | security             | feat: enable ty. upgrade uv.lock ..61.             |
| 2026-07-27 | scaler               | feat: enable ty. upgrade uv.lock ..36.             |
| 2026-07-27 | runner               | feat: add known.hosts option to config and GitSync ..71. |
| 2026-07-27 | audit-forwarder      | feat: enable ty. upgrade uv.lock ..58.             |
| 2026-07-27 | app                  | feat: ssh.known.hosts ..95.                        |
| 2026-07-27 | metastore            | feat: add basic opensearch benchmarks ..62.        |
| 2026-07-26 | metastore            | fix: prevent submitting files on a future date ..61. |
| 2026-07-24 | app                  | feat: add narrow search process config ..92.       |
| 2026-07-22 | webui                | feat: show ssdeep.tlsh when doing similarity. ..246. |
| 2026-07-22 | metastore            | feat: submission purge requires timestamp. ..60.   |
| 2026-07-22 | runner               | feat: add download pugin base class. ..63.         |
| 2026-07-22 | webui                | feat: add completion percent on plugin explore ..245. |
| 2026-07-21 | runner               | fix: allow None to be passed for version in register.multiplugin ..64. |
| 2026-07-20 | webui                | feat: add custom byte chunker ..233.               |
| 2026-07-20 | backup               | feat: prefix store for s3 ..69.                    |
| 2026-07-17 | webui                | feat: allow users to set strings length ..232.     |
| 2026-07-17 | webui                | feat: group multiplugins on plugin explore page and sticky header. ..231. |
| 2026-07-17 | app                  | feat: let backup have more env.s ..93.             |
| 2026-07-16 | app                  | feat: add externalS3Bucket variable ..94.          |
| 2026-07-16 | app                  | feat: ignore substrings in audit ..85.             |
| 2026-07-15 | smart-string-filter  | feat: upgrade onnx ..23.                           |
| 2026-07-14 | runner               | feat: fix get.data return type ..61.               |
| 2026-07-14 | client               | fix: Catch exceptions from BadResponses ..23.      |
| 2026-07-14 | webui                | fix: source table modification account for no references ..230. |
| 2026-07-14 | webui                | feat: ssdeep link to relations page. ..229.        |
| 2026-07-14 | metastore            | fix: similar entropy generating 500 error. ..57.   |
| 2026-07-14 | app                  | feat: add VT setting notes ..91.                   |
| 2026-07-14 | dispatcher           | feat: add debug endpoint ..52.                     |
| 2026-07-14 | app                  | fix: make watch.path independent of rules path ..90. |
| 2026-07-13 | webui                | feat: allow viewing of alternative reference set. ..228. |
| 2026-07-13 | audit-forwarder      | feat: filter kube.probe ..50.                      |
| 2026-07-13 | restapi-server       | feat: copy libfuzzy library for build. ..59.       |
| 2026-07-10 | runner               | feat: add ty ..58.                                 |
| 2026-07-10 | metastore            | feat: add new reference set view. ..56.            |
| 2026-07-10 | app                  | feat: add new reference set view. ..88.            |
| 2026-07-10 | webui                | feat: add a custom page and error for 500 errors. ..218. |
| 2026-07-10 | app                  | feat: add a custom page and error for 500 errors. ..89. |
| 2026-07-09 | bedrock              | feat: add new reference set view. ..108.           |
| 2026-07-08 | webui                | feat: change sources view to single table. ..217.  |
| 2026-07-07 | restapi-server       | fix: hardened build isn.t getting expected deps.   |
| 2026-07-07 | webui                | feat: add table view and additional settings. ..204. |
| 2026-07-07 | restapi-server       | feat: upgrade metastore version. ..56.             |
| 2026-07-07 | app                  | fix: file not updated. ..87.                       |
| 2026-07-07 | metastore            | feat: remove option to disable similar entropy. ..55. |
| 2026-07-07 | app                  | feat: remove option to disable similar entropy. ..86. |
| 2026-07-07 | webui                | feat: add plugin group select button on binary features view. ..216. |
| 2026-07-06 | webui                | feat: better table delims and shrink buttons ..214. |
| 2026-07-06 | bedrock              | feat: add debug endpoint ..92.                     |
| 2026-07-06 | webui                | feat: multiple small UI tweaks for feature and summary page ..215. |
| 2026-07-06 | app                  | fix: add restore service.account auth method. ..82. |
| 2026-07-03 | dispatcher           | feat: upgrade bedrock ..68.                        |
| 2026-07-03 | bedrock              | feat: finalise aes256 counter encryption. ..104.   |
| 2026-07-03 | dispatcher           | feat: add aes encryption to dispatcher. ..67.      |
| 2026-07-02 | app                  | feat: add aes encryption options to the helm chart. ..83. |
| 2026-07-01 | webui                | feat: migrate to signals part 1 ..203.             |
| 2026-07-01 | bedrock              | feat: upgrade azul bedrock to version 12. ..103.   |
| 2026-07-01 | audit-forwarder      | feat: flush logs regularly ..49.                   |
| 2026-06-30 | bedrock              | feat: adding in aes for store. ..101.              |
| 2026-06-30 | webui                | feat: update to angular 22. ..190.                 |
| 2026-06-29 | restapi-server       | feat: investigate hardened images. ..51.           |
| 2026-06-26 | demo                 | feat: release 11.2.0 ..41.                         |
| 2026-06-26 | app                  | release azul.11.2.0                                |
| 2026-06-26 | app                  | release azul.11.2.0.rc1                            |
| 2026-06-26 | webui                | fix: loading icons misbehaving. ..202.             |
| 2026-06-26 | metastore            | fix: ensure files that exist are found. ..54.      |
| 2026-06-26 | audit-forwarder      | feat: chunking by bytes for cloudwatch ..47.       |
| 2026-06-26 | webui                | feat: hex and string side by side ..200.           |
| 2026-06-26 | webui                | fix: retrohunt ..201.                              |
| 2026-06-23 | restapi-server       | feat: match jwt and cache expiry. ..53.            |
| 2026-06-23 | app                  | feat: bump to version 11. ..79.                    |
| 2026-06-23 | webui                | feat: change strings tab to use monospace font ..198. |
| 2026-06-23 | webui                | fix: enable button. ..199.                         |
| 2026-06-23 | bedrock              | fix: update install instructions ..97.             |
| 2026-06-22 | runner               | fix: git submodule update ..no.progress .. ..quiet ..56. |
| 2026-06-19 | metastore            | fix: hash download included in readonly. ..52.     |
| 2026-06-19 | webui                | feat: add banner for system in readonly state. ..189. |
| 2026-06-19 | app                  | feat: add readonly mode option. ..78.              |
| 2026-06-19 | bedrock              | fix: bad error message on failed auth. ..96.       |
| 2026-06-18 | metastore            | feat: add readonly mode to restapi. ..51.          |
| 2026-06-18 | bedrock              | feat: add readonly mode. ..98.                     |
| 2026-06-18 | demo                 | feat: upgrade to 11.1.0 ..39.                      |
| 2026-06-17 | app                  | release azul.11.1.0                                |
| 2026-06-17 | app                  | release azul.11.1.0.rc1                            |
| 2026-06-17 | app                  | fix: whitelist is now allowlist in opensearch. ..77. |
| 2026-06-16 | app                  | fix: docs formatting ..76.                         |
| 2026-06-16 | app                  | fix: simplify the inital opensearch deployment. ..75. |
| 2026-06-15 | dispatcher           | feat: faster builds using backports. ..62.         |
| 2026-06-11 | app                  | feat: upgrade kafka api versions. ..74.            |
| 2026-06-10 | demo                 | feat: upgrade demo to version 11. ..34.            |
| 2026-06-10 | app                  | feat: add log level setting for audit ..73.        |
| 2026-06-10 | app                  | release azul.11.0.0                                |
| 2026-06-10 | dispatcher           | fix: patch issue with aging off children. ..61.    |
| 2026-06-09 | webui                | feat: add retrohunt page link to tobarexternal ..176. |
| 2026-06-05 | app                  | release azul.11.0.0.rc1                            |
| 2026-06-05 | webui                | feat: make logs copyable ..170.                    |
| 2026-06-05 | webui                | fix: add timestamp param to purge ..169.           |
| 2026-06-04 | app                  | fix: prevent assemblyline reciever from liveness fail. ..72. |
| 2026-06-04 | app                  | fix: remove redis ingress. as not needed ..71.     |
| 2026-06-04 | smart-string-filter  | feat: additional lock file maintenance. ..17.      |
| 2026-06-03 | metastore            | fix: avoid security filtering on opensearch .me. ..50. |
| 2026-06-03 | demo                 | fix: opensearch init ..30.                         |
| 2026-06-03 | app                  | feat: simplify retrohunt config. ..69.             |
| 2026-06-03 | app                  | feat: remove retrohunt server ..70.                |
| 2026-06-03 | app                  | fix: retrohunt cronjob. ..68.                      |
| 2026-06-03 | dispatcher           | feat: add security filter. ..56.                   |
| 2026-06-03 | webui                | feat: integrate retrohunt webui ..160.             |
| 2026-06-02 | app                  | feat: add retrohunt config webui ..66.             |
| 2026-06-02 | runner               | feat: add max.security setting. ..54.              |
| 2026-06-02 | app                  | feat: allow dispatcher to have security configuration. ..67. |
| 2026-06-02 | bedrock              | feat: add maximum security setting ..89.           |
| 2026-05-29 | client               | feat: add zero entropy seed files. ..19.           |
| 2026-05-29 | security             | fix: add missing dependencies ..47.                |
| 2026-05-28 | metastore            | feat: simplify imports for maintenance. ..49.      |
| 2026-05-28 | bedrock              | fix: correct security import for speed. ..88.      |
| 2026-05-28 | security             | feat: lazy loading bedrock for faster CLI ..46.    |
| 2026-05-28 | client               | feat: add examples. rewrite.move docstrings. centralise vars ..18. |
| 2026-05-28 | bedrock              | feat: support lazy security. ..87.                 |
| 2026-05-28 | security             | feat: author security comparison by string. ..45.  |
| 2026-05-27 | metastore            | fix: account for display and non.display max access. ..48. |
| 2026-05-27 | webui                | fix: display user max access with alt.origin settings. ..161. |
| 2026-05-27 | webui                | fix: ensure webui updates after a security change. ..159. |
| 2026-05-27 | security             | fix: max access display and parsing fixes. ..44.   |
| 2026-05-27 | bedrock              | fix: max.security add display setting. ..86.       |
| 2026-05-26 | security             | fix: max security show most restrictive rel. ..43. |
| 2026-05-25 | dispatcher           | fix: dispatcher tests and build after bedrock changes ..53. |
| 2026-05-25 | app                  | feat: no store for cache to not cache bad content ..65. |
| 2026-05-24 | bedrock              | feat: switch yara to yara.x ..84.                  |
| 2026-05-22 | audit-forwarder      | fix: skip broken windows ..17.                     |
| 2026-05-20 | metastore            | feat: add download API to restapi ..45.            |
| 2026-05-20 | webui                | feat: add download hash to UI. ..150.              |
| 2026-05-20 | app                  | feat: add download ingestor ..64.                  |
| 2026-05-20 | bedrock              | feat: improve validation and add more options for download events. ..80. |
| 2026-05-19 | demo                 | fix: correct OpenSearch healthcheck password ..25. |
| 2026-05-15 | webui                | feat: display message during loading. ..146.       |
| 2026-05-12 | runner               | feat: create download setting and remove unused. ..52. |
| 2026-05-11 | webui                | feat: description for features.current page ..140. |
| 2026-05-07 | client               | feat: rename similar to similar features endpoint. ..17. |
| 2026-05-07 | webui                | feat: rename similar to similar feature. ..137.    |
| 2026-05-07 | metastore            | feat: rename similar to similar features for clarity. ..44. |
| 2026-05-07 | webui                | fix: remove security picker selects. ..138.        |
| 2026-05-07 | app                  | fix: allow custom plugins to override their hpas ..63. |
| 2026-05-05 | webui                | fix: prevent empty JWT requests being sent by UI. ..136. |
| 2026-05-05 | bedrock              | feat: rename similar to similar feature. ..79.     |
| 2026-05-03 | metastore            | feat: add ability to compare common strings between two binaries. ..43. |
| 2026-05-03 | webui                | feat: improve binary compare and add string comparison. ..130. |
| 2026-05-03 | webui                | fix: accordion broken after onPush change detection. ..135. |
| 2026-05-03 | audit-forwarder      | feat: remove threads and add dynamic windows ..45. |
| 2026-05-03 | security             | feat: allow multiple bedrock versions. ..40.       |
| 2026-05-01 | bedrock              | feat: add common strings return value to the API. ..78. |
| 2026-04-30 | app                  | feat: add jadx plugin ..58.                        |
| 2026-04-30 | restapi-server       | feat: add retrohunt trigger ..47.                  |
| 2026-04-29 | audit-forwarder      | feat: add chunking logic ..32.                     |
| 2026-04-29 | webui                | feat: merge yara hits. ..129.                      |
| 2026-04-28 | restapi-server       | feat: add retrohunt envs ..20.                     |
| 2026-04-28 | app                  | fix: reduce ttl time ..62.                         |
| 2026-04-28 | metastore            | feat: create better plugin completion tracking. ..41. |
| 2026-04-28 | runner               | fix: flakey test. ..51.                            |
| 2026-04-27 | runner               | fix: ack job error handling getting invalid arg. ..50. |
| 2026-04-23 | dispatcher           | feat: bump bedrock to 11.68 ..39.                  |
| 2026-04-23 | app                  | feat: add broad.narrow phase panel ..57.           |
| 2026-04-23 | app                  | fix: redis ingress ..61.                           |
| 2026-04-22 | app                  | feat: add retrohunt envs to restapi ..54.          |
| 2026-04-22 | webui                | fix: make UI show valid security pick options. ..120. |
| 2026-04-22 | bedrock              | feat: add yara hit label ..67.                     |
| 2026-04-20 | bedrock              | feat: security additional exception ..66.          |
| 2026-04-20 | security             | feat: add caveat restrictions. ..27.               |
| 2026-04-20 | app                  | fix: add egress port for OS dashboards ..60.       |
| 2026-04-17 | client               | fix: dockerfile was missing semicolon. ..16.       |
| 2026-04-17 | webui                | fix: error messages from exceptions. ..108.        |
| 2026-04-17 | bedrock              | feat: update identify with assemblyline changes. ..53. |
| 2026-04-16 | restapi-server       | feat: ensure metastore upgrades ..23.              |
| 2026-04-15 | restapi-server       | feat: log query string if present ..22.            |
| 2026-04-15 | bedrock              | feat: add decompiled.java label ..48.              |
| 2026-04-10 | stats                | fix: dockerfile was missing semicolon. ..13.       |
| 2026-04-10 | smart-string-filter  | fix: dockerfile was missing semicolon. ..9.        |
| 2026-04-10 | audit-forwarder      | fix: dockerfile was missing semicolon. ..15.       |
| 2026-04-10 | metastore            | feat: conditionally disable entropy similarity. ..36. |
| 2026-04-10 | webui                | fix: accidental showing double sha256. ..101.      |
| 2026-04-10 | restapi-server       | fix: dockerfile remove . from if else. ..21.       |
| 2026-04-10 | app                  | feat: conditionally disable entropy similarity. ..56. |
| 2026-04-10 | bedrock              | feat: enable api to be disabled in metastore. ..49. |
| 2026-04-09 | metastore            | feat: exclude newer python packages. ..35.         |
| 2026-04-09 | client               | feat: exclude newer python packages. ..15.         |
| 2026-04-09 | stats                | feat: exclude newer python packages. ..12.         |
| 2026-04-09 | scaler               | feat: exclude newer python packages. ..6.          |
| 2026-04-09 | bedrock              | feat: exclude newer python packages. ..47.         |
| 2026-04-09 | runner               | feat: exclude newer python packages. ..27.         |
| 2026-04-09 | audit-forwarder      | feat: exclude newer python packages. ..14.         |
| 2026-04-09 | smart-string-filter  | feat: exclude newer python packages. ..8.          |
| 2026-04-09 | security             | feat: exclude newer python packages. ..9.          |
| 2026-04-09 | restapi-server       | feat: exclude newer python packages. ..19.         |
| 2026-04-08 | app                  | fix: set runAsUser in container securityContext ..55. |
| 2026-04-07 | app                  | feat: add liveness check ..52.                     |
| 2026-04-07 | webui                | fix: webui fails to render similar features and parent links. ..96. |
| 2026-04-02 | dispatcher           | feat: remove go private. ..25.                     |
| 2026-04-02 | webui                | feat: add minimum release age in repo ..98.        |
| 2026-04-02 | backup               | feat: remove go private. ..22.                     |
| 2026-03-31 | webui                | feat: switch everything to onpush ..95.            |
| 2026-03-31 | webui                | feat: add a webp.gif stepper view to the data page. ..89. |
| 2026-03-30 | runner               | feat: replace gitsync sidecar ..22.                |
| 2026-03-30 | app                  | feat: replace git.sync ..46.                       |
| 2026-03-27 | app                  | feat: change security context ..51.                |
| 2026-03-26 | metastore            | feat: log filename ..34.                           |
| 2026-03-26 | metastore            | feat: enable ty. ..33.                             |
| 2026-03-26 | client               | feat: enable ty checks. ..14.                      |
| 2026-03-26 | bedrock              | feat: add missing exceptions and types for metastore ..44. |
| 2026-03-25 | metastore            | feat: add log references ..32.                     |
| 2026-03-25 | bedrock              | feat: use enum values ..43.                        |
| 2026-03-24 | metastore            | fix: remove session.id ..31.                       |
| 2026-03-23 | app                  | feat: rollback operator upgrade ..48.              |
| 2026-03-23 | app                  | feat: add security context to retrohunt cronjob ..49. |
| 2026-03-22 | app                  | fix: use new OpenSearch API version ..47.          |
| 2026-03-19 | webui                | fix: renovate config. ..78.                        |
| 2026-03-19 | metastore            | feat: entropy similarity searching. ..25.          |
| 2026-03-19 | webui                | feat: add entropy similarity comparison ..76.      |
| 2026-03-19 | bedrock              | feat: entropy similarity models. ..31.             |
| 2026-03-19 | dispatcher           | feat: upgrade yara and file ..13.                  |
| 2026-03-19 | runner               | feat: upgrade files. ..23.                         |
| 2026-03-19 | bedrock              | feat: add dependabot and a uv.lock ..32.           |
| 2026-03-16 | app                  | feat: add cleanup running delay env for retrohunt ..45. |
| 2026-03-13 | metastore            | feat: add docand grammar and fix find.all. ..24.   |
| 2026-03-13 | dispatcher           | feat: upgrade bedrock to version 11. ..12.         |
| 2026-03-13 | restapi-server       | feat: log host ip from env var ..15.               |
| 2026-03-13 | webui                | feat: add docand grammar. ..72.                    |
| 2026-03-13 | app                  | feat: add host ip for restapi ..41.                |
| 2026-03-13 | backup               | feat: upgrade bedrock to version 11. ..12.         |
| 2026-03-13 | bedrock              | feat: upgrade golang version to v11. ..30.         |
| 2026-03-13 | app                  | release azul.10.0.0                                |
| 2026-03-12 | app                  | fix: revert bad image override                     |
| 2026-03-12 | app                  | release azul.10.0.0.rc2                            |
| 2026-03-12 | app                  | fix: revert bad image override                     |
| 2026-03-12 | app                  | release azul.10.0.0.rc1                            |
| 2026-03-12 | app                  | fix: retrohunt redis network policy. ..43.         |
| 2026-03-11 | app                  | fix: retrohunt envs. ..40.                         |
| 2026-03-10 | app                  | fix: font policy includes data ..42.               |
| 2026-03-10 | restapi-server       | fix: version pin in pyproject.toml ..16.           |
| 2026-03-09 | dispatcher           | feat: upgrade golang to 1.26 ..11.                 |
| 2026-03-09 | backup               | feat: upgrade golang to 1.26 ..11.                 |
| 2026-03-06 | bedrock              | feat: upgrade golang to 1.26 ..29.                 |
| 2026-03-06 | webui                | fix: small file scrolling. ..68.                   |
| 2026-03-06 | webui                | fix: feature explore not keeping plugin names. ..58. |
| 2026-03-05 | webui                | feat.upgrade npm manually ..66.                    |
| 2026-03-05 | webui                | fix: slow down dependabot. ..63.                   |
| 2026-03-04 | app                  | feat: add a retrohunt cronjob ..35.                |
| 2026-03-03 | runner               | fix: update outdated readme.md ..21.               |
| 2026-03-03 | restapi-server       | fix: update outdated readme.md ..14.               |
| 2026-03-03 | restapi-server       | fix: remove metastore dev pinning ..13.            |
| 2026-03-03 | webui                | feat: update restapi models. ..53.                 |
| 2026-03-02 | metastore            | fix: add edge case log types. ..23.                |
| 2026-03-02 | webui                | feat: configure better dependabot behaviour. ..50. |
| 2026-03-02 | app                  | fix: add a default for log levels. ..39.           |
| 2026-03-01 | metastore            | fix: ensure inserted children are purged appropriately ..22. |
| 2026-03-01 | dispatcher           | feat: modify track.id. ..10.                       |
| 2026-03-01 | smart-string-filter  | feat: add logging configuration. ..6.              |
| 2026-03-01 | stats                | feat: minimise stats logging. ..5.                 |
| 2026-03-01 | bedrock              | feat: add logger fo golang plugins. ..28.          |
| 2026-03-01 | app                  | feat: allow users to set log levels more easily. ..37. |
| 2026-03-01 | webui                | build.deps.: bump minimatch ..48.                  |
| 2026-03-01 | restapi-server       | fix: more descriptive bad security provider. ..11. |
| 2026-02-26 | metastore            | fix: metastore integration test case break. ..21.  |
| 2026-02-26 | webui                | build.deps.dev.: bump rollup from 4.55.1 to 4.59.0 ..47. |
| 2026-02-26 | webui                | build.deps.: bump hono from 4.12.0 to 4.12.2 ..46. |
| 2026-02-25 | app                  | fix: use s3AuthMode to configure how to backup ..36. |
| 2026-02-25 | bedrock              | feat: error message translation for dispatcher errors. ..26. |
| 2026-02-24 | bedrock              | feat: add IRSA support for S3 ..25.                |
| 2026-02-24 | app                  | feat: irsa compatibility for backup ..34.          |
| 2026-02-23 | app                  | feat: add PAT auth method alongside oidc ..33.     |
| 2026-02-23 | webui                | build.deps.: bump hono from 4.11.7 to 4.12.0 ..45. |
| 2026-02-23 | app                  | feat: update redis env config ..32.                |
| 2026-02-23 | metastore            | feat: centeralise basic opensearch access. ..19.   |
| 2026-02-23 | restapi-server       | feat: add pat auth inital. ..10.                   |
| 2026-02-23 | runner               | fix: test file cleanup. ..20.                      |
| 2026-02-23 | bedrock              | feat: centeralise basic opensearch access. ..24.   |
| 2026-02-23 | webui                | build.deps.: bump tar from 7.5.7 to 7.5.9 ..44.    |
| 2026-02-23 | security             | feat: add an additional admin role utility. ..7.   |
| 2026-02-22 | demo                 | fix: various cleanups ..4.                         |
| 2026-02-18 | app                  | feat: add redis endpoint ..31.                     |
| 2026-02-17 | app                  | fix: use correct restapi logging config variable ..30. |
| 2026-02-16 | restapi-server       | fix: bedrock exception import path change. ..9.    |
| 2026-02-16 | metastore            | feat: add metastore errors to bedrock. ..18.       |
| 2026-02-15 | security             | feat: move all exceptions to bedrock ..6.          |
| 2026-02-15 | bedrock              | feat: add metastore error messages. ..23.          |
| 2026-02-15 | webui                | build.deps.: bump qs from 6.14.1 to 6.14.2 ..43.   |
| 2026-02-13 | runner               | feat: switch over to forkserver for tests. ..19.   |
| 2026-02-12 | webui                | build.deps.: bump axios from 1.13.2 to 1.13.5 ..42. |
| 2026-02-10 | runner               | feat: make compatible with bedrock exception changes. ..18. |
| 2026-02-10 | client               | feat: add a simple download for azul.client. ..11. |
| 2026-02-10 | bedrock              | feat: make compatible with bedrock exception changes. ..22. |
| 2026-02-10 | webui                | feat: add type a plugin will process. ..41.        |
| 2026-02-09 | bedrock              | feat: centeralise translatable errors. ..21.       |
| 2026-02-09 | smart-string-filter  | feat: make ai model persistent ..5.                |
| 2026-02-05 | bedrock              | feat: address ty comments. can.t enable yet due to multipart. ..20. |
| 2026-02-05 | webui                | fix: allow scroll up from bottom of file ..39.     |
| 2026-02-05 | runner               | fix: liniting tool doco ..17.                      |
| 2026-02-05 | audit-forwarder      | fix: remove hidden pyproject toml. ..12.           |
| 2026-02-05 | runner               | fix: runner tmp file cleanup ..13.                 |
| 2026-02-05 | app                  | fix: gitsync period needs to have a unit ..29.     |
| 2026-02-04 | app                  | fix: gitsync period needs to have a unit ..29.     |
| 2026-02-04 | metastore            | feat: ruff update changes ..17.                    |
| 2026-02-04 | restapi-server       | fix: add user.me api back in. ..8.                 |
| 2026-02-03 | webui                | feat: load new Azul mascot ..38.                   |
| 2026-02-03 | bedrock              | fix: additional lint changes. ..19.                |
| 2026-02-03 | runner               | fix: add in missing test.utils. ..15.              |
| 2026-02-03 | metastore            | feat: switch to uv. ruff and enable ty in audit mode ..16. |
| 2026-02-03 | app                  | fix: alloy doesn.t have internet. disable telemetry ..28. |
| 2026-02-03 | bedrock              | feat: switch to uv. ruff and enable ty in audit mode ..18. |
| 2026-02-03 | client               | feat: switch to uv. ruff and enable ty in audit mode ..10. |
| 2026-02-03 | audit-forwarder      | feat: switch to uv. ruff and enable ty in audit mode ..11. |
| 2026-02-03 | restapi-server       | feat: switch to uv. ruff and enable ty in audit mode ..7. |
| 2026-02-03 | stats                | feat: switch to uv. ruff and enable ty in audit mode ..4. |
| 2026-02-03 | scaler               | feat: switch to uv. ruff and enable ty in audit mode ..4. |
| 2026-02-03 | runner               | feat: switch to uv. ruff and enable ty in audit mode ..14. |
| 2026-02-03 | security             | feat: switch to uv. ruff and enable ty in audit mode ..5. |
| 2026-01-30 | dispatcher           | feat: add longer consumer group retention. ..8.    |
| 2026-01-30 | webui                | build.deps.: bump tar from 7.5.6 to 7.5.7 ..37.    |
| 2026-01-30 | app                  | feat: add longer consumer group retention. ..27.   |
| 2026-01-30 | webui                | build.deps.: bump hono from 4.11.4 to 4.11.7 ..36. |
| 2026-01-27 | webui                | fix: icon service ..35.                            |
| 2026-01-27 | app                  | feat: add api secrets optionally for feedley ..26. |
| 2026-01-26 | webui                | build.deps.: bump lodash from 4.17.21 to 4.17.23 ..34. |
| 2026-01-22 | metastore            | fix: ai filter keeps breaking. ..15.               |
| 2026-01-21 | webui                | feat: fix security labels ..25.                    |
| 2026-01-21 | security             | feat: update security labels webui ..3.            |
| 2026-01-21 | webui                | feat: add option for strings over large files. ..31. |
| 2026-01-21 | webui                | build.deps.: bump tar from 7.5.3 to 7.5.6 ..30.    |
| 2026-01-21 | webui                | fix: ai string filter not being provided a value. ..29. |
| 2026-01-20 | metastore            | fix: 500 errors detected via fuzz testing. ..13.   |
| 2026-01-20 | runner               | fix: refine memory check to account for inactive.file. ..11. |
| 2026-01-20 | webui                | feat: binary page formatting ..28.                 |
| 2026-01-19 | restapi-server       | feat: fix linting ..6.                             |
| 2026-01-19 | client               | feat: fix linting ..9.                             |
| 2026-01-19 | stats                | feat: fix linting ..3.                             |
| 2026-01-19 | bedrock              | feat: linting ..17.                                |
| 2026-01-19 | runner               | feat: fix linting ..10.                            |
| 2026-01-19 | scaler               | feat: fix linting ..3.                             |
| 2026-01-19 | smart-string-filter  | feat: fix linting ..3.                             |
| 2026-01-19 | audit-forwarder      | feat: fix linting ..10.                            |
| 2026-01-19 | security             | feat: fix linting ..4.                             |
| 2026-01-18 | app                  | feat: add rel origin ..25.                         |
| 2026-01-18 | webui                | build.deps.: bump tar from 7.5.2 to 7.5.3 ..27.    |
| 2026-01-15 | webui                | feat: add more options to the relational graph. ..26. |
| 2026-01-15 | backup               | feat: remove file format legacy ..7.               |
| 2026-01-15 | metastore            | feat: add more options for the cousin search. ..11. |
| 2026-01-15 | restapi-server       | feat: add warning to top of swagger ui. ..5.       |
| 2026-01-15 | client               | feat: remove file format legacy ..8.               |
| 2026-01-14 | bedrock              | feat: add small option for relational graph. ..16. |
| 2026-01-14 | dispatcher           | feat: remove file.format.legacy. ..7.              |
| 2026-01-14 | bedrock              | feat: remove file format legacy. ..14.             |
| 2026-01-14 | webui                | feat: remove file format legacy. ..24.             |
| 2026-01-14 | webui                | feat: upgrade angular to v21. ..22.                |
| 2026-01-14 | webui                | build.deps.dev.: bump hono from 4.11.3 to 4.11.4 ..23. |
| 2026-01-11 | webui                | feat: modify feature selection. ..21.              |
| 2026-01-09 | app                  | fix: allow audit https egress . add service.acc ..24. |
| 2026-01-06 | webui                | build.deps.: bump axios.cache.interceptor from 1.8.3 to 1.11.1 ..17. |
| 2026-01-06 | webui                | build.deps.: bump axios.cache.interceptor from 1.8.3 to 1.11.1 ..17. |
| 2026-01-05 | audit-forwarder      | fix: allow CloudWatch client to use IRSA creds ..9. |
| 2025-12-22 | webui                | feat: add tag picker ..16.                         |
| 2025-12-21 | webui                | feat: make relational graph easier to use. ..15.   |
| 2025-12-21 | webui                | feat: switch icons over to using filetype. ..14.   |
| 2025-12-18 | client               | feat: implement locking for multiprocessing and multithreading. ..6. |
| 2025-12-18 | backup               | feat: upgrade bedrock to v10 ..6.                  |
| 2025-12-18 | bedrock              | feat: upgrade bedrock to v10 ..13.                 |
| 2025-12-18 | app                  | feat: bump to major version 10. ..23.              |
| 2025-12-18 | demo                 | fix: use correct image path ..3.                   |
| 2025-12-18 | runner               | feat: add python 3.14 support. ..8.                |
| 2025-12-17 | bedrock              | feat: add python 3.14 support. ..12.               |
| 2025-12-17 | app                  | fix: network policy for opensearch startup. ..22.  |
| 2025-12-17 | app                  | release azul.9.0.0                                 |
| 2025-12-17 | runner               | feat: add long description for pypi. ..7.          |
| 2025-12-17 | client               | feat: add long description for pypi. ..5.          |
| 2025-12-17 | bedrock              | feat: add long description for pypi. ..11.         |
| 2025-12-16 | app                  | release azul.9.0.0.rc3                             |
| 2025-12-16 | audit-forwarder      | fix: cloudwatch client init ..8.                   |
| 2025-12-16 | app                  | feat: remove report feeds from image list. ..20.   |
| 2025-12-16 | audit-forwarder      | fix: None check ..7.                               |
| 2025-12-16 | app                  | release azul.9.0.0.rc2                             |
| 2025-12-16 | app                  | feat: create 9.0.0.rc.1                            |
| 2025-12-16 | dispatcher           | feat: upgrade bedrock. ..5.                        |
| 2025-12-16 | audit-forwarder      | fix: default cloudwatch setting to None ..6.       |
| 2025-12-16 | backup               | feat: upgrade bedrock. ..5.                        |
| 2025-12-15 | bedrock              | fix: s3 memory leak. ..10.                         |
| 2025-12-15 | client               | fix: classifiers ..4.                              |
| 2025-12-15 | bedrock              | fix: pyproject.toml ..9.                           |
| 2025-12-14 | app                  | add istio policy for scraping                      |
| 2025-12-12 | client               | feat: add classifiers. ..3.                        |
| 2025-12-12 | bedrock              | feat: add classifiers. ..8.                        |
| 2025-12-12 | app                  | feat: enable TopologySpreadConstratints and rack. ..19. |
| 2025-12-12 | app                  | feat: enable TopologySpreadConstratints and rack. ..19. |
| 2025-12-11 | webui                | feat: add AND toggle ..4.                          |
| 2025-12-11 | metastore            | feat: update rel filter logic.test ..8.            |
| 2025-12-11 | metastore            | feat: add the option to filter rels with AND clause ..2. |
| 2025-12-10 | app                  | feat: increase unbox size by default. ..18.        |
| 2025-12-08 | metastore            | feat: add additional debugging logs. ..5.          |
| 2025-12-08 | metastore            | feat: add user supplied file extension. ..6.       |
| 2025-12-08 | runner               | feat: deterministic plugin results. ..6.           |
| 2025-12-08 | app                  | fix: allow redis.ingress policy                    |
| 2025-12-08 | app                  | feat: maco git init ..16.                          |
| 2025-12-08 | audit-forwarder      | feat: aws cloudwatch forwarding ..4.               |
| 2025-12-05 | app                  | fix: allow prometheus to scrape pods through the network policy ..15. |
| 2025-12-05 | runner               | feat: log plugin registration ..5.                 |
| 2025-12-03 | webui                | feat: add ability to pivot on features ..12.       |
| 2025-12-01 | app                  | feat: initial PDBs for core services ..14.         |
| 2025-11-28 | restapi-server       | fix: adapt to change in fastapi 0.122 change. ..4. |
| 2025-11-28 | bedrock              | feat: add feature pivot API endpoints. ..7.        |
| 2025-11-26 | runner               | feat: handle sigterm gracefully. ..4.              |
| 2025-11-26 | bedrock              | feat: graceful exit on SIGTERM.SIGINT ..6.         |
| 2025-11-24 | audit-forwarder      | feat: make timeout configurable. ..3.              |
| 2025-11-20 | webui                | build.deps.dev.: bump glob from 10.4.5 to 10.5.0 ..8. |
| 2025-11-20 | bedrock              | build.deps.dev.: bump golang.org.x.crypto from 0.42.0 to 0.45.0 ..5. |
| 2025-11-18 | restapi-server       | feat: add mirroring pipeline. ..3.                 |
| 2025-11-18 | audit-forwarder      | feat: add mirroring pipeline. ..2.                 |
| 2025-11-18 | security             | feat: add mirroring pipeline. ..2.                 |
| 2025-11-18 | runner               | feat: add mirroring pipeline. ..3.                 |
| 2025-11-18 | webui                | feat: add mirroring pipeline. ..6.                 |
| 2025-11-18 | backup               | feat: add mirroring pipeline. ..4.                 |
| 2025-11-18 | metastore            | feat: add mirroring pipeline. ..3.                 |
| 2025-11-18 | dispatcher           | feat: add mirroring pipeline. ..3.                 |
| 2025-11-18 | bedrock              | feat: add mirroring pipeline. ..4.                 |
| 2025-11-18 | scaler               | feat: add mirroring pipeline. ..2.                 |
| 2025-11-18 | stats                | feat: add mirroring pipeline. ..2.                 |
| 2025-11-18 | smart-string-filter  | feat: add mirroring pipeline. ..2.                 |
| 2025-11-18 | demo                 | feat: add mirroring pipeline. ..2.                 |
| 2025-11-18 | bedrock              | feat: centeralise streams to bedrock ..3.          |
