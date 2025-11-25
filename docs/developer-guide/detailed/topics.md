# Kafka Topics

Kafka stores two different kinds of topics, `system` and `source` topic.

- `System topics` will exist in every instance of Azul and are used for specific kinds of event processing.
- There can be any number of `Source topics` the number and names depend on the helm chart configuration for sources.
  These topics are used to store data important to plugin processing.

## System topics

The topics in this table are the system level topics and used for system level functionality as well as for expediting
tasks or requesting a retry of a specific task.

| Topic                     | Description                                                                                                                                  |
|:--------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| azul.qa1.system.delete    | Topic to store all deletion events including deletion of specific source events or linking events.                                           |
| azul.qa1.system.download  | Topic to store download requests which are raised by one plugin and processed by another.                                                    |
| azul.qa1.system.error     | Unused.                                                                                                                                      |
| azul.qa1.system.expedite  | Expedite topic, used for user submissions and is processed first to make results get into the UI faster.                                     |
| azul.qa1.system.insert    | Tracks binaries attached to an existing binary as a child and is used to attach that relationship to existing events.                        |
| azul.qa1.system.plugin    | Holds all the plugin registration events that occur when a plugin starts up.                                                                 |
| azul.qa1.system.report    | Holds all of the report that come from the report                                                                                            |
| azul.qa1.system.retrohunt | Holds retrohunt events used to communicate between the retrohunt server and it's worker pods.                                                |
| azul.qa1.system.scrape    | Unused.                                                                                                                                      |
| azul.qa1.system.status    | Holds all of the status events that come from plugins including the start and completion events indicating if a plugin errored or succeeded. |

## Source Topics

Below is a list of example topics with their sources.

| Topic                                  | Description                           |
|:---------------------------------------|:--------------------------------------|
| azul.qa1.assemblyline.binary.augmented | Assemblyine source, augmented events  |
| azul.qa1.assemblyline.binary.enriched  | Assemblyine source, enrichment events |
| azul.qa1.assemblyline.binary.extracted | Assemblyine source, extracted events  |
| azul.qa1.assemblyline.binary.mapped    | Assemblyine source, mapped events     |
| azul.qa1.assemblyline.binary.sourced   | Assemblyine source, sourced events    |
| azul.qa1.samples.binary.augmented      |                                       |
| azul.qa1.samples.binary.enriched       |                                       |
| azul.qa1.samples.binary.extracted      |                                       |
| azul.qa1.samples.binary.mapped         |                                       |
| azul.qa1.samples.binary.sourced        |                                       |
| azul.qa1.testing.binary.augmented      |                                       |
| azul.qa1.testing.binary.enriched       |                                       |
| azul.qa1.testing.binary.extracted      |                                       |
| azul.qa1.testing.binary.mapped         |                                       |
| azul.qa1.testing.binary.sourced        |                                       |
| azul.qa1.virustotal.binary.augmented   |                                       |
| azul.qa1.virustotal.binary.enriched    |                                       |
| azul.qa1.virustotal.binary.extracted   |                                       |
| azul.qa1.virustotal.binary.mapped      |                                       |
| azul.qa1.virustotal.binary.sourced     |                                       |

## Consumer Groups

Below is formatted output from the command `kafkactl get consumer groups` run on the KafkaCtl pod.
This shows you the different consumer groups and the topics each consumer group is subscribed to. The name of the consumer group is in the form \<plugin-name\>-\<CG-type(expedite,live,error,historical)\>

The different type of consumers are also highlighted here:

- The status ingestor is looking at only status topics.
- Plugins are all subscribed to the same topics.
- VtQuery looks at more topics than the other plugins.

| Consumer Group Name                          | Topics                                                                                                                                           |
|:---------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| ingestor-dev01.-status-2022_09_09-0-historic | testing.status, watch.status, tasking.status, azul.status, vthunts.status, incidents.status, samples.status, virustotal.status, reporting.status |
| ingestor-dev01.-status-2022_09_09-0-live                                                      |tasking.status, reporting.status, vthunts.status, incidents.status, samples.status, virustotal.status, testing.status, watch.status, azul.status
| ingestor-dev01.-status-2022_09_09-0-interactive                                               |azul.expedite.status|
| BuildTimeStrings-interactive                                                                  |azul.expedite.binary|
| BuildTimeStrings-retries                                                                      |azul.error.binary|
| BuildTimeStrings-live                                                                         |reporting.binary.data, samples.binary.data, virustotal.binary.data, vthunts.binary.data, watch.binary.data, tasking.binary.data, incidents.binary.data, testing.binary.data|
| BuildTimeStrings-historic                                                                     |tasking.binary.data, incidents.binary.data, testing.binary.data, reporting.binary.data, samples.binary.data, virustotal.binary.data, vthunts.binary.data, watch.binary.data|
| entropy-1.1-interactive                                                                       |azul.expedite.binary|
| entropy-1.1-retries                                                                           |azul.error.binary|
| entropy-1.1-live                                                                              |reporting.binary.data, samples.binary.data, virustotal.binary.data, vthunts.binary.data, watch.binary.data, tasking.binary.data, incidents.binary.data, testing.binary.data|
| entropy-1.1-historic                                                                          |tasking.binary.data, incidents.binary.data, testing.binary.data, reporting.binary.data, samples.binary.data, virustotal.binary.data, vthunts.binary.data, watch.binary.data|
| Floss-2022.09.08-interactive                                                                  |azul.expedite.binary|
| Floss-2022.09.08-retries                                                                      |azul.error.binary|
| Floss-2022.09.08-live                                                                         |reporting.binary.data, samples.binary.data, virustotal.binary.data, vthunts.binary.data, watch.binary.data, tasking.binary.data, incidents.binary.data, testing.binary.data|
| Floss-2022.09.08-historic                                                                     |tasking.binary.data, incidents.binary.data, testing.binary.data, reporting.binary.data, samples.binary.data, virustotal.binary.data, vthunts.binary.data, watch.binary.data|
| vtquery-0.2-interactive                                                                       |azul.expedite.binary|
| vtquery-0.2-retries                                                                           |azul.error.binary|
| vtquery-0.2-live                                                                              |samples.binary, samples.binary.data, vthunts.binary, virustotal.binary, incidents.binary, testing.binary, incidents.binary.data, testing.binary.data, watch.binary.data, tasking.binary.data, reporting.binary.data, reporting.binary, watch.binary, tasking.binary, virustotal.binary.data, vthunts.binary.data|
| vtquery-0.2-historic                                                                          |watch.binary, reporting.binary.data, samples.binary.data, virustotal.binary.data, vthunts.binary.data, testing.binary.data, reporting.binary, watch.binary.data, samples.binary, vthunts.binary, virustotal.binary, tasking.binary, tasking.binary.data, incidents.binary.data, incidents.binary, testing.binary|
