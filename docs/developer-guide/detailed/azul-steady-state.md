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
    Lost-Task-Processor -. Events .-> Dispatcher
    Ingestor-Binary -. Events .-> Dispatcher
    Ingestor-Plugin -. Events .-> Dispatcher
    Ingestor-Status -. Events .-> Dispatcher
    
    AgeOff
  end
  
  Ingestor-Binary -- Save Features --> OpenSearch
  Ingestor-Plugin -- Save Registered<br> Plugin Data --> OpenSearch
  Ingestor-Status -- Save Status Updates --> OpenSearch
  Lost-Task-Processor -. RETRY Events .-> Dispatcher
  AgeOff -- Check for old Indices and data --> OpenSearch
  AgeOff -- Request Delete old data --> OpenSearch
  Dispatcher -. Events .-> Kafka[(Kafka)]
  Dispatcher -. Files .-> s3[(s3)]
```

Note: All Ingestors and AgeOff are part of the `azul-metastore` project and are simply launched with different command line variables.
