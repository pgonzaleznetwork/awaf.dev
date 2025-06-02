## Trigger Frameworks

We recommend the [Trigger Actions Framework](https://github.com/mitchspano/trigger-actions-framework) by Mitch Spano and the team at Google. This library is widely used by large enterprises, including Google itself, and provides a configuration-based framework for organizing trigger actions and defining their order of execution.

The framework models each trigger actions as a small class, which makes testing easier and can help reduce merge conflicts.

This approach can come at the cost of cohesion as related actions may be split across multiple classes, however, you can address this by organizing the classes within the appropriate [Salesforce DX folders](/AWAF/sfdx-folders.md), as we discussed earlier. 

If you are not able to switch trigger frameworks, then we recommend that you try to model your trigger handler logic in a way that supports modularity, cohesion and a reduction in merge conflicts. 

You can learn more about the Trigger Actions Framework in this session:

<iframe width="560" height="315" src="https://www.youtube.com/embed/lP615lsfRsI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
