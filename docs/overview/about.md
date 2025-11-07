---
sidebar_position: 1
title: About

---

# About Azul

Azul is a malware repository, analytical engine and clustering suite dedicated to safely handling and analysing malware. 
It is designed to be highly scalable, and store tens of millions of samples.

Azul was created by the Australian Signals Directorate (ASD) to improve the productivity of reverse engineers. 
Manual reverse engineering can take hours to get basic Indicators of Compromise (IOCs) out of samples,
days to determine the capabilities of malware,
and months to get an in-depth understanding of families of malware.

Reverse engineers can use Azul to to turn common analysis steps into analysis plugins,
which can be used as part of an automated workflow.
This reduces the need for manual re-analysis of similar samples of malware, and can assist in
identifying variants of a malware family through techniques beyond [Yara](https://virustotal.github.io/yara/) rules.

Azul does not perform binary triage; that is, it does not identify whether files are malicious. 
Anything stored in Azul should first be identified as suspicious or malicious either through binary triage tools 
like [Assemblyline](https://github.com/CyberCentreCanada/assemblyline),
or through incident response activities / threat hunting / honeypots.

### Malware repository

Azul tracks the origin information of malware which is supplied during upload.
This origin information is configurable and can include hostnames,
filenames, network information, timestamps, and other contextual information.

Azul is intended to store received malware samples for all time, assuming there is adequate storage available.
Files are stored in an s3-compatible system.

### Analytical engine

Azul provides a framework for automating scripts that have been derived from reverse engineering efforts,
to pull out indicators-of-compromise or other interesting features.

Azul includes a variety of static analysis tooling to handle archive decompression,
common Microsoft Office formats, Yara rules, snort signatures and more.

As plugins are improved and updated, analysis can be repeated on historical artifacts as necessary,
which can give new insights into past incidents.

### Clustering suite

By using features of Opensearch, Azul can help find commonalities between different samples of malware,
to determine common upstream infrastructure, patterns of development and more.
This, combined with integrating data from industry reporting, leads to more effective outcomes for reverse engineering efforts.

## Technology

Azul is built in Python, Golang and Typescript, and makes use of many other great open source software projects. 

Azul is designed to run on the Kubernetes software stack via Helm chart,
and supports monitoring/alerting via Prometheus, Loki & Grafana.

Further information about Azul's architecture can be found [here](../sysadmin-guide/20-architecture.md).

Azul provides:

* a web interface allowing users to perform analysis
* an HTTP restapi and headless client for integration with external systems
* a plugin-oriented analytical framework, allowing addition of custom file type processing
* a fast metadata store for storing and querying 'features' shared between malware
* support for industry tools such as Yara and Snort
* support for the Maco framework for malware config extraction
* a security model to restrict access to malware via OpenID Connect
* support for the [CaRT](https://github.com/CybercentreCanada/cart) format for neutering malicious software, to prevent accidental infection
