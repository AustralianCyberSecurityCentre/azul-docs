# Miscellaneous Functions

This page contains some miscellaneous components of Azul.

## Data Age Off

Ageoff is a docker container (code is in azul-metastore) that can be configured to run in Azul to delete empty indices
and old metadata from OpenSearch.
The definition of what is old and what sources to delete data from is defined in the Ageoff containers environment
variables. This varies depending on the deployment of Azul.

The process by which data is deleted by the Ageoff container is shown below:

```mermaid
sequenceDiagram
    ageoff->>OpenSearch: Query for all Indices older than configured max age.
    OpenSearch->>ageoff: Indices that meet the search criteria.
    ageoff->>OpenSearch: Request elastic search deletes the Indices.
    ageoff->>ageoff: Sleep for 10minutes.
    ageoff->>OpenSearch: Query for all Indices that are empty
    OpenSearch->>ageoff: Indices that are empty
    ageoff->>OpenSearch: Request elastic search deletes the empty Indices.
```
