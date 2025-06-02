# Dependency Injection & Boundaries

Dependency Injection (DI) is a powerful tool, but it should be applied with precision. In Apex, DI is most valuable when dealing with **boundaries**—places where your code interacts with external systems, runtime variability, or other distinct domains. Not every interaction is a boundary, and not every dependency benefits from injection.

## Understand the Spectrum of Coupling

DI is often praised for reducing coupling, but coupling exists on a spectrum. DI can reduce *metadata coupling* (tight deployment dependencies) and *knowledge coupling* (one class knowing how to construct another). But it does not eliminate *behavioral coupling*. Your classes still depend on each other's correctness.

DI helps you deploy, test, and swap implementations, but it won't fix logic errors or prevent downstream failures. You’re still responsible for ensuring the pieces work together.

## Not All Dependencies Are Equal

Some dependencies exist to provide general infrastructure (e.g. logging, async processing). Others represent shared domain logic (e.g. business rules). Infrastructure dependencies often change for unrelated reasons, which makes them good candidates for injection:

```apex
public with sharing class MassLeadConversion {
    private IMyLogger logger;

    public MassLeadConversion(IMyLogger logger) {
        this.logger = logger;
    }
}
```

You can swap `IMyLogger` at runtime or in tests without changing `MassLeadConversion`. This flexibility is exactly what DI enables.

In contrast, domain-specific classes like `OpportunityValue` or `LeadConversionUtil` are less likely to vary and often don't need DI unless you're working with multiple domain implementations.

## Focus on Boundaries

A boundary is where control, data, or responsibility leaves your module: external APIs, DML operations, configurable logic. These are the best places for DI because they introduce uncertainty or variation.

Injecting these lets you:

* Provide mock implementations during tests
* Decouple deployment and packaging
* Swap behavior based on user/org config

```apex
@AuraEnabled
public static void importData(IGitHubAPI gitHub) {
    List<Contact> contacts = (List<Contact>) gitHub.fetchJsonFromGitHub(...);
    // ...
}
```

By hiding the GitHub dependency behind `IGitHubAPI`, tests can validate `importData` in isolation.

## When to Inject, When to Hardcode

Inject dependencies when:

* The interaction represents a real boundary
* There are multiple implementations
* The dependency is difficult to test
* The dependency might vary by user/org/context

Hardcode dependencies when:

* The logic is local and simple
* There’s no foreseeable variation
* Instantiation is trivial

Hardcoding is not inherently bad. DI introduces indirection. Use it where it pays off.

## DI Isn’t a Framework

You don’t need a DI container or custom framework to apply this principle. Inject via constructors, use interfaces, and apply judgment. Good DI is simple, intentional, and driven by real boundaries in your design.

## What else could you learn?

This principle is based on Chapter 7 of the [Clean Apex Code](https://books.google.ie/books/about/Clean_Apex_Code.html?id=4yEc0QEACAAJ&source=kp_book_description&redir_esc=y) book. 

 The full chapter also covers knowledge vs. metadata coupling, the role of infrastructure services, late binding, and how DI connects with the Inversion of Control Principle.
