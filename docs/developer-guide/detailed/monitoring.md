# Monitoring in Azul

Azul is monitored using Prometheus and Promtail/Loki.

Prometheus is an open source product that gathers and hosts metrics and is specially tailored for observability of
Kubernetes environments. Once the metrics are gathered Prometheus stores the metrics to allow Grafana to use them.

Loki/Promtail: Promtail is run as a sidecar and gathers log files and forwards them to Loki.
Loki processes those log files and makes them available for Grafana.

Grafana Graphical interface to view logs and graph data.
Also allows for the generation of alerts to forward to chat servers such as Microsoft Teams and Mattermost.

## Prometheus basic Operation

Prometheus is used to gather metrics from Azul via various RestAPIs on different pods.
The pods that host metrics have a RestAPI endpoint of `/metrics`.
Pods that metrics are gathered from include:

- RestAPI
- Dispatcher
- Ingestors
- Burrow

If a pod is a short lived CronJob and cannot host a metric endpoints it uses the prometheus push gateway instead.
The Prometheus gateway collects metrics from short lived pods and
hosts them for the core Prometheus metric scraper to scrape the metrics from it instead of the short lived pods.

The pods that use the prometheus gateway include:

- virustotal-plugin (vtload)
- **in development** -  report-feeds-plugin

## Promtail/Loki

Promtail is currently hosted as a sidecar on pods that have interesting logs worth collecting.
Once logs are collected the logs are forwarded to Loki.

The pods that have their logs collected include:

- Dispatcher
- RestAPI
- Ingestors

Loki hosts the logs provided by Promtail ready for Grafana to scrape and use them.

## Grafana

Grafana is the graphical interface for rendering all the Prometheus and Loki data in a useable form.

Azul comes pre-packaged with a suite of dashboards.

The dashboards provide useful insight into the performance and use of the system.

Example dashboards include:

- Audit - There are two audit dashboards that allow for investigation of specific users activity and give insight into system usage.
- Metastore Ingestor - shows how close to live the Ingestors are.
- Infra Health - Detect when core external and internal Azul components are down.
- Backup/Restore - Show the status of any backup and restore activities.
- Per Plugin Topic lag - shows how far behind live specific plugins are.

### Grafana Alerts

Grafana can be configured to periodically poll Prometheus or Loki against a pre-defined condition.
If the condition is met an alert can be raised (for example the RestAPI server is not responding).
Using webHooks the alert can be forwarded to a chat server such as Microsoft Teams and Mattermost.

The alerts built into Azul include (not all the alerts):

- Pod in crash loop - A kubernetes Pod is in a continual crash loop indicating something is wrong with it.
- High plugin error rate (a plugin has an abnormally large error rate and should have it's configuration checked.)
- Dispatcher RestAPI errors - Dispatcher shouldn't error so if it is something is misconfigured or there is a bug.
- Ingestor lag - the ingestors are lagging far behind live (this means users won't be getting up to date data.)
- Infrastructure health - check one of the core components of Azul or services it uses is down (e.g S3 storage is down.)
