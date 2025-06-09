## FFLIB Overview

FFLIB was created by Andrew Fawcett over a decade ago as of the time of this writing. The framework originated from his experience building FinancialForce (now called Certinia), a popular managed package in the AppExchange. The framework is also known as Apex Enterprise Patterns because the patterns are a direct implementation of the techniques shown in the canonical book [Patterns of Enterprise Application Architecture](https://martinfowler.com/books/eaa.html) by Martin Fowler.

The framework proposes that we split our Apex code in 3 layers, as depicted below

![Fig. 13-1 The 3 layers and how other classes use the layers.](/public/ffliboverview.png)

At a high-level, this how each layer works:

* **Domain Layer**: Handles business logic and enforces rules for specific objects. This is where things like validations, triggers, and calculations live. It's the go-to place for managing how an object behaves.
* **Service Layer**: Manages use cases that involve multiple objects or external systems. This layer takes care of more complex business processes that span across different parts of the system.
* **Selector Layer**: Takes care of data retrieval by wrapping SOQL queries for specific objects. This helps keep things consistent, avoids duplicate queries, and makes the code easier to maintain.

So, in theory, you'd have an `Opportunities` class that handles all opportunity logic, an `OpportunityService` class that orchestrates logic and exposes common services, and an `OpportunitySelector` class where all opportunity-related queries are stored.

Application-level code (triggers, batch classes, queueable classes, etc) should call the service class.

![Fig. 13-2 Different contexts reuse the service layer.](/public/fflibcalls.png)

This framework has become incredibly popular in the Salesforce community, and for good reason. Many developers credit FFLIB with simplifying their work and reducing headaches, and it continues to be a trusted framework for structuring Apex code. We, as an ecosystem, owe Andrew Fawcett and his contributors our gratitude for introducing proven software design principles to Salesforce development. We clearly need more of that.

## The challenges with FFLIB

One of the primary challenges with this framework is how it positions itself as a solution for achieving "separation of concerns" (SoC). The messaging around SoC is so emphatic that it even tells us there are scenarios where you might choose not to implement SoC. For instance, at the time of writing, the Trailhead module on this topic includes a section titled "When You Don't Need SoC on Salesforce," suggesting that SoC is both binary and optional.

Those who have read the [Clean Apex Code](https://a.co/d/gSCaIhO) book will probably know that SoC is not something you can directly implement, it's an outcome. It emerges from applying the principles of modularity, coupling, and cohesion that are explored throughout the book. Furthermore, SoC is not binary; it doesn't simply exist or not exist. Like coupling, it operates on a spectrum, and it is a degree (low coupling vs. high coupling, and low SoC vs high SoC).

The issue isn't just the inaccurate terminology. Our concern is that this way of thinking might discourage developers from critically engaging with the principles of SoC. Instead, they may blindly follow patterns, treating them as prescriptive rather than adaptable.

In short, the framework encourages developers not to think. 

We would much rather see a team of Salesforce developers engaging in ongoing discussions about modularity in their org, debating where responsibilities should lie and how to maintain cohesion, than simply adding a method to the service class because the framework dictates it.

With that said, let's now look at some more specific concerns we have with FFLIB.

### Narrow view of the platform

We believe FFLIB thrives in a managed package environment, where the objects you operate on are owned by the package and finite in scope. For example, if the package provides specific functionality for the Opportunity object, it's logical to have an `OpportunityService` class to encapsulate its functionalities. Similarly, when developers working for the company that owns the package need to add new queries, centralizing them in an `OpportunitiesSelector` class makes sense, as all developers are likely focused on the same functionality.

In other words, this framework is well-suited for building a well-defined product with clear boundaries, such as an AppExchange package. Managed package development typically involves controlled data models and cohesive teams, which we think makes FFLIB a great fit. In fact, the framework originated from the lessons learned when building managed packages (plus Martin Fowler's teachings).

However, this isn't the reality for most development teams. In a typical enterprise company, developers and consultants come and go, and many different departments shape how Salesforce is used. Take the Opportunity object, for example. It might serve marketing, sales, and customer support, each with its own unique logic and requirements. Cramming all of that into a single `OpportunityService` class is exactly what [the Single-Responsibility Principle (SRP) encourages us to avoid.](/foundations/design-principles.md#single-responsibility-principle)

Just as a reminder, SRP tells us that if the same module can change for different reasons—like different requests from marketing, sales, or support—it's better to split them up. Otherwise, changes in one area could have unintended consequences in another, making the code harder to maintain and more error-prone.

In short, the idea that you can put all logic in 3 classes (the service, the domain and the selector) does not fit the reality of teams who are not building managed packages.

### Selectors are shallow modules

FFLIB encourages us to include all SOQL queries in a single selector class, like `OpportunitiesSelector`. The argument for doing this is to have consistency on the "shape" of your SObjects and prevent run-time errors. For example:

```apex
Opportunity oppty = [SELECT Id FROM Opportunity LIMIT 1];

if(oppty.name == 'hello'){
    //error!
}
```

When we run this, we get the dreaded error:

```
System.SObjectException: SObject row was retrieved via SOQL 
without querying the requested field: Opportunity.Name
```

This occurred because we didn't include the Name field in the query.

The [FFLIB maintainers suggest](https://github.com/apex-enterprise-patterns/fflib-apex-common/discussions/432#discussioncomment-4255219) that by centralizing all queries in a single class, you can ensure all records come back with the same set of fields (i.e the same "shape"), and thus you prevent the above error message. 

But really, all you need to do to prevent this error is to include the field in your query. You should be able to discover the error during testing, add the field to the query and move on. This shouldn't take more than 2 minutes and it doesn't warrant having all queries in the same class. For example, we can fix the above error with this:

```apex
Opportunity oppty = [SELECT Id, Name FROM Opportunity LIMIT 1];
```

Problem solved. It took longer to write this sentence than to add the field to the query.

Aside from that, the main problem is that queries are often highly specific to particular requirements. As a result, selector classes can quickly grow to include dozens of methods, each serving a unique purpose or slight variation of a similar query. For example, a selector class might look something like this (in pseudo-code):

```apex
public class OpportunitiesSelector {

   queryById()
   queryByIndustry()
   queryByField(field...)
   queryWithAllFields()
   queryWithTheseFields(fields...)
   queryWithBinds()
   queryWithLineItems()
   queryWithParentOpportunity()
}
```

When every method becomes this specific, the pattern doesn't encourage reusability. Instead, it often leads to developers creating new tailored methods or modifying existing ones, at the risk of breaking other classes that depend on them. As the class grows, it becomes harder to come up with [meaningful and descriptive names](/foundations/naming-techniques.md).

In other words, the selector ends up exposing a complicated interface while offering limited value. This is the textbook definition of a [shallow module](/foundations/method-size-structure.md#shallow-vs-deep-modules)

In our opinion, the main benefit of this approach is to enable mocking of the queries during tests. However, there are [other techniques for mocking queries](/AWAF/selector-classes.md) that are much more lightweight and don't require a centralized selector.

### Over-engineered for Salesforce

Because FFLIB is not a way of thinking but rather a specific implementation, it comes with a lot of baggage. There are numerous interfaces to implement, which adds complexity. As we discussed in [this session](https://youtu.be/Cgi2EPy5M-0?si=tAbyl1xsMDdQQ3wY), the goal of modularity is to reduce complexity, not increase it. Similarly, the YAGNI principle reminds us to build for today's needs, not for hypothetical future scenarios, though, of course, there are exceptions.

We've come across entire YouTube channels and GitHub repositories dedicated to explaining these patterns, which, to us, signals that the patterns themselves are not simple. They require convoluted explanations and a deep understanding of how all the pieces fit together. In other words, the framework is not progressive.

A progressive framework grows with your codebase. You start small, using only what you need, and as your system scales, you add more functionality to manage the complexity. FFLIB, on the other hand, takes an all-or-nothing approach.

### Not built for Salesforce

Finally, FFLIB is based on Martin Fowler's work on enterprise patterns. His book was written in 2002 and is based on his experience working with old Java applications, not modern architectures. That on its own is not a problem, after all, the [Clean Apex Code](https://a.co/d/gSCaIhO) book has an entire chapter dedicated OOP even though many of its concepts are much older, and there are often better alternatives today. We also believe there's a lot of value in taking inspiration from other realms of software design and applying those ideas to Salesforce. In fact, if you think about it, that's what this site is all about.

The problem is that when Fowler came up with these patterns, he wasn't working with Salesforce in 2025. He was solving problems in old, monolithic Java applications; systems that had full control over business logic, state, and execution flow.

He wasn't dealing with validation rules breaking his code, or case assignment rules undoing ownership changes made in Apex. He wasn't designing for a platform where governor limits dictate how many DML operations you can commit in a single transaction. His patterns were designed to solve his problems, problems that made sense in the context of the software he was working on.

If Fowler were working with Salesforce today, you can bet he wouldn't have written the exact same patterns. He would've considered the event-driven nature of the platform, the mix of declarative and programmatic logic, and the constraints imposed by multi-tenant architecture. That's why we can't just take patterns from a different era and a different problem domain and apply them blindly. Instead, we should understand the principles behind them and adapt them to fit the unique constraints of Salesforce development.

Some may argue that this mindset is just an excuse for poorly structured Apex or that Fowler's patterns are timeless. But the truth is, the patterns themselves are not timeless; **the underlying principles are**.

So, what is at the core of these patterns? **Modularity**. For us, it's much more valuable to learn the principles of modularity than to blindly apply patterns that were created for a completely different architectural domain and a completely different era.

You can learn more about the principles of Modularity in Apex in this session:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cgi2EPy5M-0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Gratitude

After spending the last few sections critiquing FFLIB, we want to take a moment to emphasize that this is not a critique on its creators or collaborators. The framework has brought immense value to the Salesforce community, and our ecosystem is undeniably better because of it. Few people will ever match the inspiration, vision, and technical expertise of Andrew Fawcett, and for that, we owe him our gratitude.

Critique is necessary if we want to move forward, even if it's uncomfortable. With that said, the responsibility now falls on us to propose an alternative.

## What's the alternative?

As much as we'd like to propose a drop-in replacement for FFLIB, that's not what we want to propose here. Instead, we want to propose a set of guiding principles that can be implemented differently based on team size and org complexity. we will also provide some opinionated recommendations for some libraries that you should consider.

Based on our experience, we don't think the Salesforce ecosystem is ready for a batteries-included framework that developers can start using from day one. This is because Salesforce development (as an industry) is very different from traditional software development.

Many Salesforce developers come from non-engineering backgrounds, and most teams are a mix of admins and developers. On top of that, there's much more to Salesforce than just Apex; you can build an entire application without writing a single line of code.

There's also the reality that Salesforce orgs tend to operate in enterprise environments with tight controls. It's not easy to get approval to use a library that affects every part of how you write Apex. What happens if the library maintainers abandon it? Or if a bug in the library blocks a critical deployment? In traditional software development, these concerns are smaller because there are many more developers, and for every library, there are usually multiple alternatives. That's just not the case with Salesforce.

Instead of creating an implementation framework, we believe we should focus on principles. Principles give us the flexibility to adapt to our specific needs, whether we're a small team working on a simple org or an enterprise team managing a highly complex environment. This way, we're not locked into a single approach but can still draw on proven ideas to write modular, scalable, and maintainable code.

**What we need is a Well-Architected Framework for Apex.**
