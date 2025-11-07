# Submission Processing

This page shows some more detail about what happens after a file is submitted to Azul.

How the file is processed and what happens with the file's metadata.

## Summary

In short a file is uploaded through Azul's UI or RestAPI and submitted to dispatcher.
Dispatcher places the uploaded file and related submission event into S3 and Kafka respectively.
Plugins continually poll for new events from dispatcher which will provide the event from Kafka to the plugin.
The plugin will then process the event and request the raw source file from S3 via dispatcher (if required).
The results will be provided back to dispatcher which stores them in Kafka.
The ingestors continually pull events from kafka and when they get the event from kafka they will index it into Opensearch.
The results will then appear on the WebUI or via the RestAPI when Opensearch is queried.

The below series of diagrams summarise this process with the arrows indicate the direction data is flowing.

```mermaid
flowchart TB
  subgraph Submission
    User1[User] -- Submission --> RestAPI1[RestAPI]
    RestAPI1 -- Submission file + metadata --> Dispatcher1[Dispatcher]
    Dispatcher1 -- Submission metadata --> Kafka1[Kafka]
    Dispatcher1 -- Submission data --> S3A[S3]
  end

  subgraph Process
    direction LR
    Plugin2[Plugin]
    Dispatcher2[Dispatcher]
    kafka2[Kafka]
    S3B[S3]

    Dispatcher2 -- Fetch metadata --> Plugin2
    kafka2 -- Retrieve metadata --> Dispatcher2
    S3B -- Retrieve submitted file --> Dispatcher2
    Plugin2 -- Submit metadata result + extracted content --> Dispatcher2
    Dispatcher2 -- Store Result Event --> kafka2
    Dispatcher2 -- Store Extracted files --> S3B
  end

  subgraph Index
    direction LR
    direction LR
    Ingestor3[Ingestor]
    Opensearch3[Opensearch]
    Dispatcher3[Dispatcher]

    Dispatcher3 -- Fetch Binary Events --> Ingestor3
    Ingestor3 -- Index Events --> Opensearch3
  end

  subgraph Retrieve
    direction RL
    Dispatcher4[Dispatcher]
    S3D[S3]
    Opensearch4[Opensearch]
    RestAPI4[RestAPI]
    User4[User]

    User4 -- Request Metadata about submission --> RestAPI4
    RestAPI4 -- Resultant Metadata and Extracted content --> User4

    Opensearch4 -- File Metadata --> RestAPI4
    Dispatcher4 -- Download file --> RestAPI4
    S3D -- Fetch file --> Dispatcher4
    
  end
  Submission --> Process
  Process --> Index
  Index --> Retrieve
```

## File Submission

A more detailed view of a user uploading a file results in the file being saved and an event being produced.
As the user expects to see the event immediately, it also needs to be available in Opensearch.

```mermaid
sequenceDiagram
  User->>Restapi: POST Binary to Source
  Restapi->>Dispatcher: POST Binary
  Dispatcher->>S3: Store Binary with sha256
  S3-->>Dispatcher: ok
  Dispatcher-->>Restapi: hashes and file magic
  Restapi->>Dispatcher: POST Event
  Dispatcher->>Kafka: Store Event on Source Topic
  Kafka-->>Dispatcher: ok
  Dispatcher-->>Restapi: ok
  Restapi->>Opensearch: POST Event (For immediate search availability)
  Opensearch-->>Restapi: ok
  Restapi-->>User: hashes and file magic
```

## Processing

For detailed information about processing refer to [plugins](./plugins.md)

## Event Ingestion/Indexing for Search

Events published to Kafka need to be transformed and ingested into Opensearch.
This is required before the events can be exposed via the external API.

Ingestors are the containers that complete this work and are continually running in a loop where they continually 
request new messages from topics. They then convert that data into an appropriate form and save it into OpenSearch.

```mermaid
sequenceDiagram
  Ingestor->>Dispatcher: Get Events
  Dispatcher->>TopicSrc1: Get Events
  TopicSrc1-->>Dispatcher: no events
  Dispatcher->>TopicSrc2: Get Events
  TopicSrc2-->>Dispatcher: some events
  Dispatcher-->>Ingestor: Events
  Ingestor->>Opensearch: Add Events (optimised for search)
  Opensearch-->>Ingestor: ok
```
