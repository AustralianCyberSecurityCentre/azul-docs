# Known Issues

This section of documentation contains known unfixed or unfixable issues in the azul code base.

## Unfixable issues

- When looking at memory usage for pendulum>=3.0.0 with `memray` usage will report as 1GB of RAM although only about 10MB of RAM is used.
  This can come up when memory debugging anything that uses azul-bedrock and azul-runner (all plugins.)

## Content Cache Hits

The content cache will be hit 2+ times whenever a binary is viewed on the UI.
This is currently expected behaviour although in the grafana metrics it can look odd that there are so many hits.

The reason for this is that the following requests are made by the UI if the binary exists.

First Viewing of a binary:

```mermaid
sequenceDiagram
    participant webui
    participant restapi
    participant dispatcher
    participant Storage

    Note over webui,Storage: Check Binary exists
    webui->>restapi:check binary exists content
    restapi->>dispatcher:check binary exists content
    dispatcher->>dispatcher:check cache (no hit)
    dispatcher->>Storage:check binary exists content
    Storage->>dispatcher:binary exists
    dispatcher->>restapi:binary exists
    restapi->>webui:binary exists
    Note over webui,Storage: Skipping over Restapi as it's not intering

    Note over webui,Storage: First download of Binary
    webui->>dispatcher:get binary for strings
    dispatcher->>dispatcher:check cache (no hit)
    dispatcher->>Storage:check binary exists content
    Storage->>dispatcher:binary exists
    dispatcher->>Storage:request binary
    dispatcher->>dispatcher:check cache (no hit)
    Storage->>dispatcher:stream with binary
    dispatcher->>dispatcher:cache binary
    dispatcher->>webui:stream with binary

    Note over webui,Storage: First download of Binary
    webui->>dispatcher:get part of file for hex view
    webui->>dispatcher:get binary for strings
    dispatcher->>dispatcher:check cache (hit)
    dispatcher->>dispatcher:check cache (hit)
    dispatcher->>webui:stream with binary

    Note over webui,Storage: Augmented Streams will also be like first download
```

### Second viewing of the binary on the UI (e.g after page refresh):

```mermaid
sequenceDiagram
    participant webui
    participant restapi
    participant dispatcher
    participant Storage

    Note over webui,Storage: Check Binary exists
    webui->>dispatcher:check binary exists content
    dispatcher->>dispatcher:check cache (hit)
    dispatcher->>webui:binary exists

    Note over webui,Storage: Files Strings
    webui->>dispatcher:get binary for strings
    webui->>dispatcher:get binary for strings
    dispatcher->>dispatcher:check cache (hit)
    dispatcher->>dispatcher:check cache (hit)
    dispatcher->>webui:stream with binary

    Note over webui,Storage: Hex viewing
    webui->>dispatcher:get part of file for hex view
    webui->>dispatcher:get binary for strings
    dispatcher->>dispatcher:check cache (hit)
    dispatcher->>dispatcher:check cache (hit)
    dispatcher->>webui:stream with binary

    Note over webui,Storage: Augmented Streams (x1+ potentially lots of files)
    webui->>dispatcher:get augmented stream
    webui->>dispatcher:get augmented binary for strings
    dispatcher->>dispatcher:check cache (hit)
    dispatcher->>dispatcher:check cache (hit)
    dispatcher->>webui:stream with augmented binary
```

This second viewing will result in 7 cache hits and 3 download requests.

You will also see a huge number of hits when filtering strings and hex view as every time a restapi request is made the file will be fetched.
This means that scrolling through the hex view you could get hundreds of hits.
