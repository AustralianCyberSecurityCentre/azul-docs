# Azul Steady State

The following diagram highlights how Azul runs without any API requests from the user.

What is noteworthy is that the ingestors continually get more data through dispatcher from the kafka topics and continue to save the data into OpenSearch.
The special plugins of virustotal and azul-report-feeds (in development) continually acquire data from their external data sources and pipe them into the appropriate kafka topics.

```mermaid
flowchart LR
  subgraph Azul[Azul]
    Plugin-vt <-. Request Metadata for last minute .-> VirusTotal[virustotal.com <br>or virus local]
    Plugin-vt[Plugin Virus Total] -. Events Metadata From Virus Total .-> Dispatcher
    Plugin-rf -. Request Metadata From External source.-> Dispatcher
    Plugin-rf[Plugin Report Feed] -. Events Metadata From External source.-> Dispatcher
    Ingestor-Binary -. Events .-> Dispatcher
    Ingestor-Plugin -. Events .-> Dispatcher
    Ingestor-Status -. Events .-> Dispatcher
    Ingestor-Download -. Events .-> Dispatcher
    AgeOff
    Lost-Task
  end
  
  Ingestor-Binary -- Save Features --> OpenSearch
  Ingestor-Plugin -- Save Registered<br> Plugin Data --> OpenSearch
  Ingestor-Status -- Save Status Updates --> OpenSearch
  Ingestor-Download -- Save Download as Status --> OpenSearch
  AgeOff -- Check for old Indices and data --> OpenSearch
  AgeOff -- Request Delete old data --> OpenSearch
  Dispatcher -. Files .-> s3[(s3)]
  Dispatcher -. Events .-> Kafka[(Kafka)]
  Dispatcher -. Store Started Job .-> Redis[(Redis)]

  Lost-Task -. Report Failure .-> Kafka[(Kafka)]
  Lost-Task -. Check Old Jobs .-> Redis[(Redis)]
  
  
  
```

Note: All Ingestors and AgeOff are part of the `azul-metastore` project and are simply launched with different command line variables.
