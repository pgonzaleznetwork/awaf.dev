## Logging and Observability

Using `System.debug()` is fine for quick troubleshooting or Apex performance profiling during development. However, for production support, it’s the worst possible solution. It requires setting up debug logs for the affected user, retrieving the log, and dealing with potential size limits where the part you actually care about gets trimmed.

For a better solution, we recommend [Nebula Logger](https://github.com/jongpie/NebulaLogger) by Jonathan Gillespie. Nebula Logger is an observability framework that integrates with Apex, Lightning Components, Flow, OmniStudio, and external integrations. The library has strong community support and has been featured at many events, including Dreamforce.

You can learn more about Nebula Logger in this session:

<iframe width="560" height="315" src="https://www.youtube.com/embed/RYUz7Y9i0Sk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

