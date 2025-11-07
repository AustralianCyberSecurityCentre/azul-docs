# Getting logs

To get large amounts of logs about a user or when something bad happens and you need them for evidence you should use logcli.

To download log cli use the command:

`wget https://github.com/grafana/loki/releases/download/v3.4.2/logcli-linux-amd64.zip`

Newer versions can be found here `https://github.com/grafana/loki/releases`

To connect to loki port forward loki to your local host then set the LOKI_ADDR:

```bash
# Port forward
kubectl port-forward -n monitoring service/loki 3100:3100
# LOKI address in seperate terminal.
export LOKI_ADDR=http://localhost:3100
```

Queries you'd expect to use are somethign like this:

```bash
./logcli-linux-amd64 query '{app="restapi-server-audit", namespace="azul-dev"} | "username" = "user@email.com"' --since 24h --limit 200

# All logs for a specified user <-- username -->
./logcli-linux-amd64 query '{app="restapi-server-audit", namespace="azul-dev"} | logfmt | username = "<-- username -->"' --since 24h --limit 200
# All logs for a user that also contain a particular sha256
./logcli-linux-amd64 query '{app="restapi-server-audit", namespace="azul-dev"} |~ `(?i)<-- sha256 -->` | logfmt | username = "<-- username -->" | ' --since 24h --limit 200

# Example usage of all queries in the last 24hours for user user@email.com and sha256 40eaec3ffee4f2d887a86b61f2e08bd1ccf9655fb8d078e79c1ab203ad2129e9 in the namespace azul-dev.
./logcli-linux-amd64 query --since 24h --limit 200 '{app="restapi-server-audit", namespace="azul-dev"} |~ `(?i)40eaec3ffee4f2d887a86b61f2e08bd1ccf9655fb8d078e79c1ab203ad2129e9` | logfmt | username = "user@email.com"'

```

You can also create queries in grafana and in their code format they are simple to extract.

Here is an example of a large parallel query that will allow you to grab everything from a wide date range with lots and lots of data.

```bash
./logcli-linux-amd64 query  --quiet --timezone=Local --from="2025-03-05T00:00:00Z" --to="2025-03-31T04:31:00Z" --parallel-duration="1h" --parallel-max-workers="4" --part-path-prefix="/tmp/dan-loki-query" --merge-parts '{app="restapi-server-audit", namespace="azul-dev"} | logfmt | username = "user@email.com"' > output-logs.log


./logcli-linux-amd64 query --output=raw --quiet --timezone=Local --from="2025-03-05T00:00:00Z" --to="2025-03-31T04:31:00Z" --parallel-duration="1h" --parallel-max-workers="4" --part-path-prefix="/tmp/dan-loki-query" --merge-parts '{app="restapi-server-audit", namespace="azul-dev"} | logfmt | username = "user@email.com"' > output-logs.log


./logcli-linux-amd64 query --quiet --timezone=Local --from="2025-03-05T00:00:00Z" --to="2025-03-31T04:31:00Z" --parallel-duration="1h" --parallel-max-workers="4" --part-path-prefix="/tmp/dan-loki-query" --merge-parts '{app="restapi-server-audit", namespace="azul-dev"} | logfmt | username = "user@email.com"' > output-logs.log
# NOTE - --output=raw removes some of the timestamp data from the logs and means significantly less data in the result which may or may not be desirable
./logcli-linux-amd64 query --output=raw --quiet --timezone=Local --from="2025-03-05T00:00:00Z" --to="2025-03-31T04:31:00Z" --parallel-duration="1h" --parallel-max-workers="4" --part-path-prefix="/tmp/dan-loki-query" --merge-parts '{app="restapi-server-audit", namespace="azul-dev"} | logfmt | username = "user@email.com"' > output-logs.log

# default output
#2025-03-31T00:28:40Z {duration_ms="8.442401885986328", filename="/logs/restapi-audit.2025-03-31_00-00-11_859211.log", full_time="31/Mar/2025:00:28:40.596476", method="POST", path="/api/v0/features/values/parts/entities/counts", referer="https://azul-dev.internal/ui/pages/binaries/current/binary/40eaec3ffee4f2d887a86b61f2e08bd1ccf9655fb8d078e79c1ab203ad2129e9", security="MORE OFFICIAL REL:APPLE", status="200"}                                              full_time=31/Mar/2025:00:28:40.596476 client_ip=127.0.0.1 client_port=0 connection=- username=user@email.com method=POST path=/api/v0/features/values/parts/entities/counts status=200 user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0" referer=https://azul-dev.internal/ui/pages/binaries/current/binary/40eaec3ffee4f2d887a86b61f2e08bd1ccf9655fb8d078e79c1ab203ad2129e9 duration_ms=8.442401885986328 security="MORE OFFICIAL REL:APPLE"

# --output-raw example:
# full_time=31/Mar/2025:00:33:34.299490 client_ip=127.0.0.1 client_port=0 connection=- username=user@email.com method=GET path=/api/v0/binaries/40eaec3ffee4f2d887a86b61f2e08bd1ccf9655fb8d078e79c1ab203ad2129e9/new status=200 user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0" referer=https://azul-dev.internal/ui/pages/binaries/current/binary/40eaec3ffee4f2d887a86b61f2e08bd1ccf9655fb8d078e79c1ab203ad2129e9 duration_ms=38.07830810546875 security="MORE OFFICIAL REL:APPLE"
```

Tested this query and got 100k logs in 10seconds.
