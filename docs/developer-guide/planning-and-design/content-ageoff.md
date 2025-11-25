# Content age off

Goals

* delete content we are not using
* keep content we are using

Assumptions

* most sources won't have an age off of any content as they are not high volume
* age off period is >2 days in all cases

Complexities

* sources have different age off requirements
* cache means that last modified time for s3 object is not reliable (to a degree, cache is limited in size)
* big queues mean that plugins will eventually fail to grab required artifact to execute

Cache age problem can be solved by guaranteeing ignoring anything from cache that is older than 1 day.
This would make s3 object timestamps somewhat accurate as plugins have to rerun and reproduce artifacts.
This might be already happening, not sure.

Plugins grabbing dead artifacts

* We need a new error type for this so its easy to track down and isolate age off from other issues with a plugin
* If this occurs it means we need to reconfigure our deployment to keep up.
* Or it means that something has gone terribly wrong with the below implementation.

## Multiple separate instances of azul

Isolates plugins, dispatcher, metastore, kafka, and s3 buckets

No pivoting between different instances

Multiple UI's for accessing data

Easily would solve age off issue between sources at the cost of not having
the ability to query between different source groups and users having to look at two interfaces.

Most complex to manage as separate elasticsearch indices and another kafka cluster have to be run.

## One Dispatcher, Multiple Buckets

Source age off requirements means that we need to track which sources have ever used an artifact.

* use one bucket and combine existing tags when writing data
    * hcp is bad so not sure we can guarantee the object tag method would even work reliably/scale
* cache requires extra thought as is shared between sources meaning plugins wont run & tags wont be updated correctly
* plugins have to be aware what source they are reading and writing content for so it is tagged correctly.

Cache problem requires further processing whenever cache is hit

* got to parse event to find which binaries were produced by that event originally and then read and write tags
* I am against this idea since it requires heavy parsing of the event and more network & disk IO.
* we are doing more than 10k events/second at peak and most events have no actual content to find but we still
would need to check

Alternative cache solution

* separate cache for sources that age off data
    * simpler and more reliable implementation than above
    * this way other sources will reproduce the same binary with the same plugin
    * accept the cost of running plugins redundantly

At this point, pretty likely that relevant sources with ageoff have their own dispatcher instance anyway to handle
plugin isolation to specific sources.


## Multiple Dispatchers, Multiple Buckets

I prefer this solution because we have to run multiple dispatchers anyway. I fleshed this one out more than the other.

We are already planning to run multiple dispatchers to isolate plugins to run on specific sources.

This is primarily because some sources are expected to have a much larger quantity of data flow through them.

The primary reason to have content age off is the same.

The main issue with content ageoff is that it is difficult to tell what sources are referencing a specific content blob.

With multiple dispatchers, we already know exactly what sources are using it, and we can cluster these to have
the same age off requirement.

I propose that each dispatcher has a 'primary' bucket which all of their plugins read and write from.
Plugins using the dispatcher may not access any other s3 bucket for storing/retrieving content blobs.

* Removes the issue of cache between sources as each dispatcher has an isolated cache.
* As all the sources for the dispatcher have the same age off requirement, we can use simple bucket lifecycle rules
to delete old content blobs.
* fewer duplicates in buckets because not one bucket per source, but one bucket per different dispatcher

### Parents/Children

Data will age off from the system ignoring parent/child relationships. The only thing that matters is the last timestamp at which the data was written to s3.

Metadata from elasticsearch is aged off based on source-entity timestamp so metadata will usually be aged off before data unless the source-entity timestamp is in the future.

### Complexities

* non-plugin submissions need to send artifact to correct bucket
    * content submission to dispatcher needs to be source aware (dispatcher api change)
        * does not impact external restapi
* resubmit binaries from one source to another (including promotion to keep forever)
    * need to hit all buckets,  so dispatcher has to be aware of all non-primary buckets
* download binary (non-plugin)
    * need to hit all buckets, so dispatcher has to be aware of all non-primary buckets
* cannot have dispatcher running plugins over all sources if there is more than one source group
    * cache problem occurs
    * need to document, and put in constraints that raise error if this is configured where possible
* cache on submissions may be an issue
    * disable cache
* avoid overhead on plugin processing
    * by default dispatcher will only use its primary bucket when api is used
* cannot split existing artifacts to enable age off
    * migration script required
        * iterate all binaries in s3
        * record last modified time for binary (to use server time not local time)
        * get all sources for binary via elasticsearch
        * resubmit 'content' only (not events) to these sources via dispatcher
            * avoids rerunning plugins
        * iterate all binaries in s3
            * if last modified time is same as when you ran the previous part
                * delete object since its not referenced for this source-group bucket

### enhancements required to implement

dispatcher

* aware of all sources and how they map to buckets
    * source_groups.json
    * list groups of sources (name, list of sources, the bucket name, retention information, is_default_for_unknown_sources)
* content submission has optional parameter to supply the source it belongs to.
    * plugins should never use this since it indicates they are targeting the wrong dispatcher.
    * dispatcher looks up relevant bucket for source-group and puts artifact there instead of primary
        * dispatcher does not look in other buckets for artifacts
* content retrieval has optional parameter to check all source-group buckets.
    * plugins should never use this since it will be slower.
* if there is no source_groups.json, use a good default
* if plugin has REQUIRES_DATA = True, also check to see if data would have aged off before sending event to plugin (or HEAD s3)


plugins/runner

* error type if data was not able to be retrieved (aged off but was still sent event)

restapi

* use optional parameters to submit binaries with source name
* use optional parameters to retrieve binaries from all buckets

plugin deployment config

* retarget to relevant dispatcher

restapi deployment config

* retarget to relevant dispatcher

deployment config - one dedicated dispatcher for restapi/non-plugins to hit

* does not run any plugins
* cache is specifically disabled
* source_groups.json
* no source group specified

deployment config - other dispatchers

* source_groups.json
* name of source group to run with
