# Software Design Principles

These are the most important software design principles a Salesforce developer should know.

## Single Responsibility Principle

A module should have one reason to change. That doesn't mean "one method" or "one class per object type." It means changes should be isolated by purpose or persona. If the marketing team changes something and the support team's logic breaks, your module is probably doing too much.

In Apex, this can surface in domain classes. Consider this example:

```apex
public with sharing class Cases extends ApplicationSObjectDomain {
    public void getSupportCaseSLA();
    public void getCaseAge();
    public void createMarketingCase();
}
```

Each method supports a different team. Mixing them risks unintended side effects. A better approach is to split these into separate modules, each focused on a single business concern.

Hold this principle lightly. SRP can mean different things: "only one reason to change," "gather things that change together," or "serve one stakeholder." In practice, these all point to the same goal: avoid mixing unrelated responsibilities.

## Open/Closed Principle

A module should be open to extension but closed to modification. In Apex, this often means using polymorphism or configuration to introduce new behavior without changing existing code.

```apex
DMLExecutable operation = this.operationsByDmlAction.get(this.operation);
operation.execute(this.records, this.allowPartialSuccess);
```

Adding a new DML operation means writing a new implementation, not changing this method. This pattern reduces bugs and makes logic easier to extend.

Use this when variation is expected. If logic is unlikely to change, a simple switch may be more readable and efficient.

## Liskov Substitution Principle

Subtypes should work anywhere their base type is expected. Violations of this principle often show up as type-specific checks:

```apex
if (record instanceof Lead) {
    // special handling
} else {
    Database.update(record, true);
}
```

Here, `Lead` breaks the contract expected by `SObject`. That means `Lead` is not a proper subtype, and the method becomes harder to reason about.

If you find yourself writing type checks, ask whether inheritance is the right tool. Maybe the base class needs to be redesigned, or maybe polymorphism isn't a good fit.

## Interface Segregation Principle

Interfaces should be small and focused. In Apex, this means avoiding interfaces that force classes to implement behavior they don't need.

Salesforce gets this right with `Database.Batchable`, `Database.Stateful`, and `Database.RaisesPlatformEvents`. Optional behaviors are kept separate.

Keep your interfaces lean. If you're using them for test doubles or DI, avoid overloading them with unrelated methods.

## Dependency Inversion Principle

High-level policies should not depend on low-level details. Instead, both should depend on an abstraction. And the abstraction should reflect the needs of the high-level policy.

This flips the usual direction of dependency. Instead of the policy reaching down into the details, the details are designed to serve the policy. This makes modules easier to test, easier to reason about, and less brittle when the underlying details change.

## DRY

Don't repeat yourself. But don't overdo it. Duplicating code twice can help you discover the right abstraction. Abstracting too early often leads to wrong contracts and unnecessary coupling.

It's better to duplicate a `for` loop than to create a complex utility that every module depends on.

Let repetition emerge before you eliminate it. When you do refactor, make sure the abstraction is obvious and stable.

## YAGNI

You Aren't Gonna Need It. Avoid writing abstractions or features just in case you might need them. Let real requirements guide your design.

If you haven't seen the need yet, hold off. You're more likely to create something wrong than something useful.

## Design Errors Out of Existence

This principle, borrowed from John Ousterhout, encourages you to eliminate error cases through semantics rather than handling them everywhere.

For example, `insert new List<Account>();` doesn't throw an error. That avoids needless guard clauses like:

```apex
if (!newAccounts.isEmpty()) {
    insert newAccounts;
}
```

Can you redefine the operation so that edge cases disappear? When you can, do it. It makes code easier to follow.

## What else could you learn?

This principle is based on Chapter 9 of the [Clean Apex Code](https://books.google.ie/books/about/Clean_Apex_Code.html?id=4yEc0QEACAAJ&source=kp_book_description&redir_esc=y) book. 

The full chapter includes deeper explanations for each software design principle, and more advanced examples, specially for Dependency Inversion. 
