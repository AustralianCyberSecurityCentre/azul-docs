---
hide_table_of_contents: true
---

# Other Architecture

## Restapi

A more detailed view of how restapi is broken down with it's various plugins and what they contact.

In brief:

Restapi has the following plugins:

- metastore (does all the bulk of the binary work upload/download kafka jobs)
- security
- pat auth (Optional - authenticates PAT tokens created by Admins)
- alerter (Optional - configured to raise conditional alerts)
- retrohunt (Optional - if retrohunt is enabled, allows for retrohunts to be performed.)

The proxy hosting Restapi also hosts:

- Docs
- Webui
- NSRL (Optional - only if NSRL is configured)

```mermaid
---
config:
  flowchart:
    defaultRenderer: "elk"
---

flowchart LR;

User[User Browser or Azul Client];
User --HTTPS--> OIDC;
User --HTTPS--> NginxProxy;

subgraph External[External Dependencies]
    OIDC[OIDC/IDM];
end

subgraph NginxProxy[Nginx Proxy]
    subgraph SummaryRestapi[Azul Restapi]
        RestAPI[RestAPI]
        Metastore[Metastore]
        PatAuth[PAT Auth]
        Retrohunt[Retrohunt]
        Security[Security]
        Alerter[Alerter]
    end
    Docs
    Webui
    NSRL
end

subgraph DataStorage[Data Storage]
    OpenSearch[(OpenSearch)];
    Redis
end

Metastore --HTTP(s)--> Dispatcher;
Metastore --HTTPS--> SSFinder[Smart String Finder];
Metastore --HTTPS--> OpenSearch;

RestAPI --HTTPS--> OIDC;

PatAuth -- Authorize User --> OpenSearch;

Redis -- Read alerter config --> Dispatcher
Redis -- Send Alert --> Dispatcher

Retrohunt -- Retrohunt Job --> Redis
Redis -- Get Job Status --> Retrohunt

RetrohuntWorker[Retrohunt Worker] -- Look for Job --> Redis
Redis -- Update Job status --> RetrohuntWorker[Retrohunt Worker]


NSRL -- User Lookup --> Lookup[Nsrl Lookup Server]


Alerter -- Store Config --> Redis
Alerter -- Read Alert --> Redis

Alerter -- Alert Webhook --> Webhook[External Webhook]

```


## Monitoring

Grafana, prometheus and Loki are used for logging and monitoring Azul.

Included with that is a log forwarder that forwards loki logs to an external server for long term storage.

A pod called stats is also used to probe other components of Azul to verify if they are up or down and in a read/write state.

Burrow is another important pod that is used to query Kafka and gather statistics for Prometheus to scrape.

Pods that are scraped by prometheus:

- Dispatcher
- Restapi
- Backup
- Restore
- Ingestors
- Smart String Filter
- Assemblyline Receiver
- Retrohunt Worker
- Burrow
- Stats
- VT Filefeed Server
- Kafka

Pods that use a promethus Push Gateway for stats:

- azul-plugin-report-feeds

Pods that use Alloy to forward logs to Loki:

- Dispatcher
- Restapi
- Ingestors



```mermaid
---
config:
  flowchart:
    defaultRenderer: "elk"
---
flowchart LR;

subgraph PrometheusScrape[Prom scrape pods]
    Restapi
    Ingestor
    Dispatcher
    Other[Many others]
end

subgraph AlloySideCar[Alloy Sidecar pods]
    Restapi2[Restapi]
    Ingestor2[Ingestor]
    Dispatcher2[Dispatcher]
end

Prometheus -- Scrape of Prometheus Stats--> PrometheusScrape
Loki -- Logs forwarding to loki --> AlloySideCar
Grafana -- Collect Stats --> Prometheus
Grafana -- Collect Logs --> Loki
LogForwarder -- Collect Logs --> Loki
LogForwarder -- Forward to Log storage --> LogStorage[External Log Storage]
```
