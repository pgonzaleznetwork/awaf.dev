## What is AWAF?

There isn't an agreed approach to structuring Salesforce Apex code and organising files and modules. Most orgs organically grow into a big ball of mud, where it's impossible to untangle anything without frustration. Other orgs early on adopt a framework like [FFLIB (Apex Enterprise Patterns)](https://trailhead.salesforce.com/content/learn/modules/apex_patterns_sl), created by Andrew Fawcett. And other orgs achieve some level of modularity with unlocked packages and internal libraries.

The goal of the Apex Well-Architected Framework (AWAF) is to propose a new way to structure an Apex codebase and to provide opinionated recommendations on what libraries and tools you should use. 

It's not a "put this here" kind of framework. It's a set of ideas to help you and your team make better decisions as your org grows. It's based on the same concepts covered in [Clean Apex Code](https://a.co/d/gSCaIhO)—things like modularity, coupling, cohesion, and testability—but it doesn't force you into a specific setup. 

Our vision is that every team can implement AWAF, yet each implementation can be completely different. In a way, no one should be able to tell you what an org using AWAF looks like; instead, **they should be able to tell you what working in such an org feels like**. A developer may work on two completely different codebases, yet the experience should **feel the same**.

Finally, AWAF is meant to be a modern alternative to FFLIB for those who find the framework unsatisfactory.
