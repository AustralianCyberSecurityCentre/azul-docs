# Retrohunt Configuration and Operations Guide

This guide describes how to configure, deploy, scale, validate, and troubleshoot the Azul Retrohunt plugin.

Retrohunt provides on-demand historical YARA scanning over previously ingested content. It uses a retroingestor, one or more hunt workers, an indexer, Redis, shared persistent storage, dispatcher services, and Prometheus metrics.

---

## Architecture overview

| Component | Command | Purpose |
|---|---|---|
| Retroingestor | `azul-plugin-retroingestor` | Coordinates ingestion, index maintenance, cleanup, and Retrohunt operations. |
| Worker | `azul-plugin-retroworker` | Executes broad-phase and narrow-phase YARA searches. |
| Content indexer | `azul-plugin-retroindexer --indexer-name content` | Builds long-term searchable indexes from content streams. |
| Redis | External service | Stores hunt state, work queues |
| Persistent volume | Mounted at `/indices` | Stores bgi indexes. |
| Dispatcher/streams | Azul platform services | Retrieve candidate files during narrow-phase scanning. |
| Prometheus | Metrics consumer | Scrapes metrics from each Retrohunt container. |

All Retrohunt containers must mount the same index volume at the path configured by `PLUGIN_ROOT_PATH`.

```text
/indices
```

---

## Prerequisites

Before enabling Retrohunt, ensure that:

- The `plugin-retrohunt` image is available.
- Redis is deployed and reachable.
- The Redis secret contains `redis-username` and `redis-password`.
- A persistent volume can be provisioned with sufficient capacity and I/O performance.
- All Retrohunt containers can mount the same index volume.
- Dispatcher services can retrieve files from configured sources.
- The cluster has sufficient memory and CPU for all extra containers in the Retrohunt pod.
- The `content` stream label exists and receives files that should be indexed.
- Prometheus scraping is configured when metrics are required.
- The Helm chart supports `extraContainers` using `plugin.container.main`.

---

# Base configuration

```yaml
retrohunt:
  type: standard
  enabled: true

  # CronJob schedule used to clean up hunts.
  schedule: "0 2 * * *"

  pvc:
    size: "100Gi"

  # Shared configuration applied to Retrohunt containers.
  config:
    max_thread_count: "10" # number active narrow search threads for each container
    PLUGIN_ENABLE_MEM_LIMITS: "false"
    PLUGIN_ROOT_PATH: "/indices"

    PLUGIN_INDEXERS:
      content:
        name: content
        stream_labels:
          - content
        max_bytes_before_indexing: "10GiB"
        periodic_index_frequency_min: "60"
        timeout_minutes: "60"
        allow_splitting_and_deletion: "true"
```

---

# Enabling Retrohunt

Enable the plugin with:

```yaml
retrohunt:
  enabled: true
```

Disable it without deleting the configuration with:

```yaml
retrohunt:
  enabled: false
```

Disabling Retrohunt does not automatically delete the PVC or existing index data.

---

# Hunt cleanup schedule

The cleanup CronJob uses:

```yaml
schedule: "0 2 * * *"
```

This runs daily at 02:00 according to the timezone used by the Kubernetes CronJob.

Cron format is:

```text
minute hour day-of-month month day-of-week
```

Examples:

```yaml
# Daily at 02:00
schedule: "0 2 * * *"

# Every six hours
schedule: "0 */6 * * *"

# Every Sunday at 03:00
schedule: "0 3 * * 0"
```

---

# Persistent storage

Retrohunt uses a persistent volume for indexes:

```yaml
pvc:
  size: "100Gi"
```
The size of the pvc should be configured according to your environment. e.g. 67 bgi index files comes to roughly 223Gi etc.

The plugin mounts the claim:

```yaml
volumes:
  - name: indices
    persistentVolumeClaim:
      claimName: plugin-retrohunt
```

Every Retrohunt container mounts it at:

```yaml
volumeMounts:
  - name: indices
    mountPath: "/indices"
```

This must match:

```yaml
PLUGIN_ROOT_PATH: "/indices"
```

## Storage sizing

Required capacity depends on:

- Total content volume.
- Number and size of indexes.
- Index creation frequency.
- Temporary indexing data.
- Failed or split index directories.
- index retention.

## Storage performance

Retrohunt can be I/O intensive. Prefer storage with good sequential throughput, low metadata latency, and sufficient IOPS for multiple workers and the indexer.

## Recreate strategy

The main Retrohunt workload uses:

```yaml
strategy:
  type: Recreate
```

This stops the current pod before starting the replacement. It is appropriate when the PVC is `ReadWriteOnce` or when two main pods must not operate on the same index directory simultaneously.

Do not change to `RollingUpdate` without verifying storage access and application safety.

---

# Shared configuration

Settings under:

```yaml
retrohunt:
  config:
```

are made available through the `retrohunt` ConfigMap:

```yaml
envFrom:
  - configMapRef:
      name: retrohunt
```

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: retrohunt
data:
  REDIS_HOST: '{{ (split ":" .Values.external.redis.endpoint)._0 }}'
  REDIS_PORT: '{{ (split ":" .Values.external.redis.endpoint)._1 }}'
  REDIS_DB: "{{ .Values.external.redis.db }}"
  REDIS_CLEANUP_DELAY: "{{ .Values.external.redis.cleanup_delay }}"
  REDIS_CLEANUP_RUNNING_DELAY: "{{ .Values.external.redis.cleanup_running_delay }}"
  REDIS_TTL: "{{ .Values.external.redis.ttl }}"
  REDIS_EXCEPTION_WAIT: "{{ .Values.external.redis.exception_wait }}"  
  MAX_THREAD_COUNT: "{{ .Values.plugins.retrohunt.config.max_thread_count }}"
  DEFAULT_NARROW_PHASE_CLEANUP_MULTIPLIER: "{{ .Values.plugins.retrohunt.config.default_narrow_phase_cleanup_multiplier }}"
  MAX_REQUIRED_STRINGS_PER_AND_SEARCH: "{{ .Values.plugins.retrohunt.config.max_required_strings_per_and_search }}"
  MAX_REQUIRED_STRING_SEARCHES_PER_INDEX: "{{ .Values.plugins.retrohunt.config.max_required_string_searches_per_index }}"
  MAX_BROAD_PHASE_WORKERS: "{{.Values.plugins.retrohunt.config.max_broad_phase_workers }}"
  MAX_BROAD_PHASE_TASKS: " {{ .Values.plugins.retrohunt.config.max_broad_phase_tasks }}"
```

Set this value to the number of days before a stored hunt is cleaned up by the cronjob.
```yaml
REDIS_CLEANUP_DELAY: "{{ .Values.external.redis.cleanup_delay }}"
```
Set this value to the number of days before a running hunt is cleaned up by the cronjob. 
```yaml
REDIS_CLEANUP_RUNNING_DELAY: "{{ .Values.external.redis.cleanup_running_delay }}"
```
This is the time in seconds for a worker to hold a redis jobstream (hunt job).
The worker will periodically refresh this time as it works. 
If a worker fails at some point when processing a hunt, and stops refreshing the ttl, another worker will pick up the job when this time expires. 

A pod restart is normally required after changing these values.
```yaml
REDIS_TTL: "{{ .Values.external.redis.ttl }}"
```
Controls how frequently Retrohunt performs its explicit memory cleanup during narrow phase.
The cleanup batch size is calculated from the number of active narrow workers:

cleanup batch size =
    active workers × default_narrow_phase_cleanup_multiplier

For:
max_thread_count = 8
default_narrow_phase_cleanup_multiplier = 4

with enough candidate files:

active workers = 8

cleanup batch =
    8 × 4
    = 32 files

Which produces:
cleanup every 32 files
After each batch Retrohunt releases references, runs Python garbage collection and attempts to return unused native heap memory to the operating system.
Increasing this number will decrease the cleanup overhead which can increase performance, but it can also increase memory pressure if dealing with larger files.
```yaml
DEFAULT_NARROW_PHASE_CLEANUP_MULTIPLIER: "{{ .Values.plugins.retrohunt.config.default_narrow_phase_cleanup_multiplier }}"
```
Controls how many strings can be added to one BigGrep AND search. 
Increasing this number will increase the broadphase accuracy resulting in fewer candidate files being sent to Narrowphase.
This can increase memory pressure.
```yaml
MAX_REQUIRED_STRINGS_PER_AND_SEARCH: "{{ .Values.plugins.retrohunt.config.max_required_strings_per_and_search }}"
```
```
Sets the preferred maximum number of atom-group searches performed against each index for a rule.
This is different from the number of YARA strings. One YARA string can generate many atom searches, particularly when modifiers such as nocase are used.
For example:

$a = 1 atom search
$b = 1 atom search
$c nocase = 64 atom searches
Total = 66 searches per index

If:
max_required_string_searches_per_index = 64
then the complete 66-search broad plan exceeds the preferred budget. The planner will attempt to retain the most useful parts of the condition while staying around the configured limit.

For N indexes:

approximate tasks =
    selected searches per index × number of indexes
    
For example:

64 searches/index × 22 indexes = 1,408 broad-phase tasks

This is a preferred limit, not the ultimate hard safety limit. If a minimum safe search requires more searches, the planner may exceed it, provided it remains underneath max_broad_phase_tasks.

Higher values lead to more complete broadphase filtering with potentially fewer narrow candidates. This will increaes broad-phase work.

Lower values will decreaes broadphase work, but potentially increase candidates sent to narrowphaes
```
```yaml
MAX_REQUIRED_STRING_SEARCHES_PER_INDEX: "{{ .Values.plugins.retrohunt.config.max_required_string_searches_per_index }}"
```
The number of concurrent broadphase workers. Recommended to keep this number the same as the number of CPUs in the container.
Increasing this number can decrease broadphase processing time significantly granted the CPUs are available. 
```yaml
MAX_BROAD_PHASE_WORKERS: "{{.Values.plugins.retrohunt.config.max_broad_phase_workers }}"
```
```
Sets the hard upper limit on the total amount of BigGrep work a hunt may generate.
Unlike max_required_string_searches_per_index, this is a hard safety limit.

The calculation is:

total broad tasks = searches per index × number of indexes

For example:

341 searches/index
22 indexes

341 × 22 = 7,502 tasks

With:

max_broad_phase_tasks = 100000

that is allowed because:

7,502 < 100,000

The planner also calculates a hard per-index allowance:

hard searches/index = max_broad_phase_tasks // number of indexes

For 22 indexes:

100,000 // 22 = 4,545 searches/index

A plan requiring more total work than the configured maximum is rejected rather than allowing an unbounded broad search.
Increasing this number may increase memory pressure duing the broadphase. 
Recommended to keep it around 100_000
```
```yaml
MAX_BROAD_PHASE_TASKS: " {{ .Values.plugins.retrohunt.config.max_broad_phase_tasks }}"
```
---

# Narrow-phase thread count

The number of narrow-phase threads used by each worker is:

```yaml
max_thread_count: "10"
```

This value applies independently to every worker container.

| Workers | Threads per worker | Maximum worker threads |
|---:|---:|---:|
| 1 | 10 | 10 |
| 2 | 10 | 20 |
| 3 | 10 | 30 |
| 4 | 10 | 40 |

Adding workers multiplies total concurrency; it does not divide the thread count between workers.
We have found that this can have a heavy impact on Dispatcher CPU.

## Memory guidance

Use at least 4 GiB per worker as a minimum baseline.

For 10 threads, 4 to 8 GiB per worker is a safe starting point, especially for large files or large narrow-phase candidate sets.

```yaml
resources:
  requests:
    memory: "2Gi"
    cpu: "100m"
  limits:
    memory: "4Gi"
    cpu: "1000m"
```

Memory use increases with:

- Thread count.
- High value for `DEFAULT_NARROW_PHASE_CLEANUP_MULTIPLIER` (number of files stored in memory before cleanup)
- Concurrent downloads.
- Candidate file size.
- YARA working memory.
- Multiple simultaneous hunts.
- Dispatcher buffering.
- Python and allocator behaviour.

If a worker is OOM-killed:

1. Reduce `max_thread_count`.
2. Increase worker memory.
3. Reduce the number of simultaneous workers.
4. Review candidate counts and file sizes.
5. Check whether several hunts run concurrently.
6. Reduce `DEFAULT_NARROW_PHASE_CLEANUP_MULTIPLIER`

## CPU guidance

A limit of:

```yaml
cpu: "1000m"
```

allows one CPU core.

More CPU helps when YARA scanning is CPU-bound. It may not improve performance when workers are waiting for dispatcher retrieval, network I/O, or persistent storage.

---

# Plugin memory limits

The internal plugin memory limiter is disabled:

```yaml
PLUGIN_ENABLE_MEM_LIMITS: "false"
```

This avoids incorrect memory-limit behaviour caused by cgroup detection.

---

# Content indexer configuration

```yaml
PLUGIN_INDEXERS:
  content:
    name: content
    stream_labels:
      - content
    max_bytes_before_indexing: "10GiB"
    periodic_index_frequency_min: "60"
    timeout_minutes: "60"
    allow_splitting_and_deletion: "true"
```

## Indexer name

The indexer command must match the configured name:

```yaml
command:
  - azul-plugin-retroindexer
  - "--indexer-name"
  - "content"
```

## Stream labels

The indexer processes data associated with:

```yaml
stream_labels:
  - content
```

Additional labels may be added, but this increases indexing and storage load.

## Index byte threshold

```yaml
max_bytes_before_indexing: "10GiB"
```

When accumulated input reaches approximately 10 GiB, Retrohunt creates a new long-term index.

Smaller values create indexes more often. Larger values create fewer, larger indexes.

## Periodic indexing

```yaml
periodic_index_frequency_min: "60"
```

This allows indexing every 60 minutes even when the byte threshold has not been reached.

Lower values make low-volume data searchable sooner but increase indexing overhead.

## Index timeout

```yaml
timeout_minutes: "60"
```

An indexing operation exceeding this duration is terminated and treated as failed.

Increase it only after checking storage, CPU, memory, and index size.

## Failed-index splitting

```yaml
allow_splitting_and_deletion: "true"
```

If an index directory fails twice, Retrohunt may split it into smaller directories and remove the failed directory.

Use this only where source data can be regenerated or re-ingested.

---

# Main Retrohunt container

The main container runs:

```yaml
command:
  - azul-plugin-retroingestor
```

Example:

```yaml
plugins:
  retrohunt-worker:
    additionalLabels:
      allow-egress-redis: "true"

    strategy:
      type: Recreate

    promMetricsEnabled: true
    promPort: "8900"

    image: plugin-retrohunt
    runTimeout: "6000"
    maxFileSize: "100000000"
    useSmartScaler: false

    command:
      - azul-plugin-retroingestor

    volumeMounts:
      - name: indices
        mountPath: "/indices"

    volumes:
      - name: indices
        persistentVolumeClaim:
          claimName: plugin-retrohunt

    envFrom:
      - configMapRef:
          name: retrohunt

    baseEnv:
      - name: REDIS_USERNAME
        valueFrom:
          secretKeyRef:
            name: "{{ .Values.secrets.redis }}"
            key: redis-username

      - name: REDIS_PASSWORD
        valueFrom:
          secretKeyRef:
            name: "{{ .Values.secrets.redis }}"
            key: redis-password
```

## Run timeout

```yaml
runTimeout: "6000"
```

This is 6,000 seconds, or 100 minutes. It allows long-running maintenance, indexing, or compaction tasks to complete.

## Maximum file size

```yaml
maxFileSize: "100000000"
```

This is approximately 100 MB in decimal bytes.

Larger files take longer to download and scan and may increase memory use. Review dispatcher timeouts and worker memory before increasing it.

## Smart scaler

```yaml
useSmartScaler: false
```

The smart scaler remains disabled because it cannot reliably detect or manage extra worker containers. Scale Retrohunt by adding or removing explicit `extraContainers`.

---

# Redis configuration

Each Retrohunt container requires Redis credentials:

```yaml
- name: REDIS_USERNAME
  valueFrom:
    secretKeyRef:
      name: "{{ .Values.secrets.redis }}"
      key: redis-username

- name: REDIS_PASSWORD
  valueFrom:
    secretKeyRef:
      name: "{{ .Values.secrets.redis }}"
      key: redis-password
```

Verify the secret exists:

```bash
kubectl get secret <redis-secret-name> -n <namespace>
```

Verify the expected keys without decoding them:

```bash
kubectl get secret <redis-secret-name>   -n <namespace>   -o jsonpath='{.data.redis-username}'
```

```bash
kubectl get secret <redis-secret-name>   -n <namespace>   -o jsonpath='{.data.redis-password}'
```

Do not expose decoded production credentials in documentation or tickets.

---

# Default worker

```yaml
extraContainers:
  worker:
    template: "plugin.container.main"
    promMetricsEnabled: true
    promPort: "8901"

    envFrom:
      - configMapRef:
          name: retrohunt

    env:
      - name: PLUGIN_PROMETHEUS_PORT_WORKER
        value: "8901"

      - name: REDIS_USERNAME
        valueFrom:
          secretKeyRef:
            name: "{{ .Values.secrets.redis }}"
            key: redis-username

      - name: REDIS_PASSWORD
        valueFrom:
          secretKeyRef:
            name: "{{ .Values.secrets.redis }}"
            key: redis-password

    image: plugin-retrohunt

    resources:
      requests:
        memory: "2Gi"
        cpu: "100m"
      limits:
        memory: "4Gi"
        cpu: "1000m"

    command:
      - azul-plugin-retroworker

    volumeMounts:
      - name: indices
        mountPath: "/indices"
```

The worker command must be:

```yaml
command:
  - azul-plugin-retroworker
```

The Helm metrics port must match the environment variable:

```yaml
promPort: "8901"
```

```yaml
- name: PLUGIN_PROMETHEUS_PORT_WORKER
  value: "8901"
```

---

# Content indexer container

```yaml
content-indexer:
  template: "plugin.container.main"
  promMetricsEnabled: true
  promPort: "8902"

  envFrom:
    - configMapRef:
        name: retrohunt

  env:
    - name: PLUGIN_PROMETHEUS_PORT_INDEXER
      value: "8902"

    - name: REDIS_USERNAME
      valueFrom:
        secretKeyRef:
          name: "{{ .Values.secrets.redis }}"
          key: redis-username

    - name: REDIS_PASSWORD
      valueFrom:
        secretKeyRef:
          name: "{{ .Values.secrets.redis }}"
          key: redis-password

  image: plugin-retrohunt

  resources:
    requests:
      memory: "8Gi"
      cpu: "100m"
    limits:
      memory: "16Gi"
      cpu: "4000m"

  command:
    - azul-plugin-retroindexer
    - "--indexer-name"
    - "content"

  volumeMounts:
    - name: indices
      mountPath: "/indices"
```

The indexer receives more CPU and memory than a standard worker because index creation can be resource intensive.

Monitor index duration, memory, CPU, temporary storage, failure count, and timeout events.

---

# Adding extra workers

Additional workers are added under:

```yaml
retrohunt:
  plugins:
    retrohunt-worker:
      extraContainers:
```

Each extra worker requires:

- A unique container name.
- `template: "plugin.container.main"`.
- The `plugin-retrohunt` image.
- `azul-plugin-retroworker`.
- The `retrohunt` ConfigMap.
- Redis credentials.
- A unique Prometheus port.
- Matching `PLUGIN_PROMETHEUS_PORT_WORKER`.
- Resource requests and limits.
- The `/indices` volume mount.

Example:

```yaml
retrohunt:
  debug: true

  plugins:
    retrohunt-worker:
      debug: false

      extraContainers:
        worker-2:
          template: "plugin.container.main"
          allowAllTraffic: true
          promMetricsEnabled: true
          promPort: "8903"

          envFrom:
            - configMapRef:
                name: retrohunt

          env:
            - name: REDIS_USERNAME
              valueFrom:
                secretKeyRef:
                  name: "{{ .Values.secrets.redis }}"
                  key: redis-username

            - name: REDIS_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: "{{ .Values.secrets.redis }}"
                  key: redis-password

            - name: CONTAINER_MEMORY_LIMIT_MI
              valueFrom:
                resourceFieldRef:
                  containerName: worker-2
                  resource: limits.memory
                  divisor: 1Mi

            - name: PLUGIN_PROMETHEUS_PORT_WORKER
              value: "8903"

          image: plugin-retrohunt

          resources:
            requests:
              memory: "2Gi"
              cpu: "100m"
            limits:
              memory: "4Gi"
              cpu: "1000m"

          command:
            - azul-plugin-retroworker

          volumeMounts:
            - name: indices
              mountPath: "/indices"

        worker-3:
          template: "plugin.container.main"
          allowAllTraffic: true
          promMetricsEnabled: true
          promPort: "8904"

          envFrom:
            - configMapRef:
                name: retrohunt

          env:
            - name: REDIS_USERNAME
              valueFrom:
                secretKeyRef:
                  name: "{{ .Values.secrets.redis }}"
                  key: redis-username

            - name: REDIS_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: "{{ .Values.secrets.redis }}"
                  key: redis-password

            - name: CONTAINER_MEMORY_LIMIT_MI
              valueFrom:
                resourceFieldRef:
                  containerName: worker-3
                  resource: limits.memory
                  divisor: 1Mi

            - name: PLUGIN_PROMETHEUS_PORT_WORKER
              value: "8904"

          image: plugin-retrohunt

          resources:
            requests:
              memory: "2Gi"
              cpu: "100m"
            limits:
              memory: "4Gi"
              cpu: "1000m"

          command:
            - azul-plugin-retroworker

          volumeMounts:
            - name: indices
              mountPath: "/indices"
```

# Network policy

The base plugin includes:

```yaml
additionalLabels:
  allow-egress-redis: "true"
```

Extra workers may use:

```yaml
allowAllTraffic: true
```

Prefer the least permissive network policy supported by the environment.

Workers normally require access to:

- Redis.
- Dispatcher services.
- Supporting Azul APIs.
- Prometheus scraping endpoints.

Avoid `allowAllTraffic: true` in production when specific policies are available.

---

# Worker scaling behaviour

Additional workers primarily improve total throughput and queue processing when several hunts run at once.

They may not make a single hunt faster.

Performance depends on:

- Hunt assignment.
- Candidate counts.
- Dispatcher throughput.
- Storage I/O.
- Redis performance.
- Network latency.
- Worker CPU.
- Number of active hunts.

Adding workers can reduce performance when they compete for dispatcher, storage, Redis, node CPU, or network bandwidth.

For example, three workers using 10 threads each can generate up to 30 concurrent narrow-phase operations.

---

# Dispatcher and streams tuning

High Retrohunt thread counts can place significant load on dispatcher file retrieval.

When worker CPU is low but hunts are slow, the bottleneck may be dispatcher or streams retrieval rather than YARA scanning.

For high thread counts, allocate approximately 3 to 4 CPUs to the dispatcher path as a starting point.

Example:

```yaml
dispatcher:
  ...
  plugin:
    events:
      env:
        BED.LOG_LEVEL: "INFO"
        BED.LOG_PRETTY: "TRUE"
        DP.EVENTS.DEDUPE_CACHE_BYTES: "1Gi"
        DP.EVENTS.REPLAY_PLUGIN_CACHE.SIZE_BYTES: "1Gi"

      replicas: 1

      resources:
        requests:
          memory: "12Gi"
          cpu: "500m"
        limits:
          memory: "12Gi"
          cpu: "2"

    streams:
      env:
        BED.LOG_LEVEL: "INFO"
        BED.LOG_PRETTY: "TRUE"
        DP.STREAMS.CACHE.SIZE_BYTES: "2Gi"
        DP.STREAMS.CACHE.SHARDS: 32

      replicas: 1

      resources:
        requests:
          memory: "8Gi"
          cpu: "2"
        limits:
          memory: "16Gi"
          cpu: "4"
```

## Streams service

```yaml
requests:
  memory: "8Gi"
  cpu: "2"

limits:
  memory: "16Gi"
  cpu: "4"
```

When Retrohunt is slow and workers show low CPU:

1. Check the streams CPU is not too low.
2. Check dispatcher request latency.
3. Check storage latency.
4. Check network throughput.
5. Increase dispatcher-related CPU to 3 or 4 cores when CPU constrained.
6. Increase streams CPU where retrieval concurrency is high.
7. Avoid increasing worker threads until retrieval is healthy.

Increasing `max_thread_count` without increasing dispatcher capacity can increase contention without improving hunt duration.

---

# Capacity planning

## Small deployment

```yaml
max_thread_count: "4"
```

Worker:

```yaml
resources:
  requests:
    memory: "1Gi"
    cpu: "100m"
  limits:
    memory: "2Gi"
    cpu: "1000m"
```

Use one worker for evaluation, small indexes, and low hunt volume.

## Medium deployment

```yaml
max_thread_count: "8"
```

Worker:

```yaml
resources:
  requests:
    memory: "2Gi"
    cpu: "500m"
  limits:
    memory: "4Gi"
    cpu: "2000m"
```

Use two workers for moderate concurrent hunt volume.

## High-concurrency deployment

```yaml
max_thread_count: "10"
```

Worker:

```yaml
resources:
  requests:
    memory: "4Gi"
    cpu: "500m"
  limits:
    memory: "8Gi"
    cpu: "2000m"
```

Use five or more workers only after reviewing dispatcher CPU, streams CPU, Redis, storage throughput, and total pod size.

---

# Total pod sizing

All extra containers run in one Retrohunt pod. The scheduler must place the entire pod on one node.

Example:

| Container | Memory request | Memory limit |
|---|---:|---:|
| Worker | 4 GiB | 4 GiB |
| Worker 2 | 8 GiB | 8 GiB |
| Worker 3 | 8 GiB | 8 GiB |
| Content indexer | 8 GiB | 16 GiB |

These extra containers request 28 GiB and have a combined 36 GiB limit, excluding the retroingestor.

The node must also have room for Kubernetes services, DaemonSets, runtime overhead, and other workloads.

If the pod remains pending:

```bash
kubectl describe pod <retrohunt-pod> -n <namespace>
```

Look for:

```text
Insufficient memory
Insufficient cpu
volume node affinity conflict
unbound immediate PersistentVolumeClaims
```

---

# Prometheus ports

Every container must use a unique port.

| Container | Port |
|---|---:|
| Retroingestor | `8900` |
| Worker | `8901` |
| Content indexer | `8902` |
| Worker 2 | `8903` |
| Worker 3 | `8904` |

For a worker:

```yaml
promPort: "8903"
```

must match:

```yaml
- name: PLUGIN_PROMETHEUS_PORT_WORKER
  value: "8903"
```

For an indexer:

```yaml
promPort: "8902"
```

must match:

```yaml
- name: PLUGIN_PROMETHEUS_PORT_INDEXER
  value: "8902"
```

Use `8905` for a fourth worker unless another container already uses it.

---

# Debugging

Group-level debugging:

```yaml
retrohunt:
  debug: true
```

Plugin override:

```yaml
plugins:
  retrohunt-worker:
    debug: false
```

Use debug logging temporarily. It can increase log volume, storage use, and operational noise.

---

# Troubleshooting

## Pod remains pending

Check:

```bash
kubectl describe pod <retrohunt-pod> -n <namespace>
```

Common causes:

- Insufficient node memory.
- Insufficient CPU.
- Unbound PVC.
- Volume node affinity.
- The combined pod is too large.
- Taints or selectors prevent scheduling.

## Worker is OOM-killed

Symptoms:

```text
Reason: OOMKilled
Exit Code: 137
```

Actions:

1. Reduce `max_thread_count`.
2. Increase worker memory.
3. Prefer 8 GiB for 10 threads.
4. Reduce simultaneous workers.
5. Review file size and candidate counts.
6. Check for concurrent hunts.

## Memory remains elevated after a hunt

Container memory may remain high because Python, YARA, allocators, and filesystem caches retain reusable memory.

A stable plateau is less concerning than continuous growth over repeated hunts.

Run several comparable hunts and check whether memory stabilises or continues increasing toward the limit.

## Worker CPU is low but hunts are slow

Likely causes:

- Dispatcher retrieval bottleneck.
- Streams CPU saturation.
- Storage I/O saturation.
- Network latency.
- Redis delay.
- Large candidate files.
- Too much worker concurrency.

Check shared services before increasing threads.

## Extra worker does not start

Check:

- Unique container name.
- Correct YAML indentation.
- Correct template.
- Correct image.
- `azul-plugin-retroworker`.
- Redis secret references.
- `/indices` mount.
- Unique metrics port.
- Correct `promMetricsEnabled` capitalisation.
- Correct `resourceFieldRef.containerName`.
- Node capacity.

## Extra worker has no metrics

Check:

```yaml
promMetricsEnabled: true
```

and ensure:

```yaml
promPort: "8903"
```

matches:

```yaml
PLUGIN_PROMETHEUS_PORT_WORKER: "8903"
```

Also confirm Prometheus configuration and network policy.

## Worker cannot connect to Redis

Check:

- Secret name.
- Required keys.
- Network policy.
- Redis DNS.
- Authentication.
- TLS requirements.

## Worker cannot find indexes

Confirm every container uses:

```yaml
PLUGIN_ROOT_PATH: "/indices"
```

and:

```yaml
mountPath: "/indices"
```

Inspect the mounted contents from each container.

## Indexer repeatedly times out

Check:

- Index size.
- Storage performance.
- Indexer CPU.
- Indexer memory.
- Input volume.
- Timeout value.
- Failed-index splitting.

Possible changes:

```yaml
timeout_minutes: "120"
```

or:

```yaml
max_bytes_before_indexing: "5GiB"
```

Increase the timeout only when indexing is still making healthy progress.

## Hunt restarts after narrow phase

Check:

- Worker restart count.
- OOM events.
- Worker exceptions.
- Redis hunt-state updates.
- Dispatcher timeouts.
- Final hunt-state persistence.