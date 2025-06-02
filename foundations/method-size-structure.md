# Short Methods and Deep Modules

Short methods are useful when they clarify design, isolate complexity, or simplify a public API. But shortness by itself is not a goal. Chopping a method into fragments can hurt cohesion, increase cognitive load, and produce interfaces that are harder to use.

The better rule is this: public methods should be *deep*. They should do a lot of work behind a simple interface.

## Shallow vs. Deep Modules

A deep module provides significant value with minimal surface area. It hides complexity and keeps the caller focused on what matters.

```apex
Limits.getDmlStatements();
```

This method is deep. It does one thing, but that one thing does a lot for the caller. We don’t need to know how it works internally—we just use it.

Now compare that to a hypothetical shallow version:

```apex
Limit limit = new Limit(LimitType.DML);
limit.setContext(ApexContext.Batch);
limit.startTracking();
// your code here
limit.stopTracking();
limit.getLimit();
```

Each method is small and focused, but the overall interface is shallow and harder to use. You have to learn more, call more, and think more.

Deep modules protect you from that. They wrap the complexity so you don’t have to deal with it.

## When Short Methods Help

Short methods are still useful when:

* **You need to explain a decision**. Wrapping a one-liner in a method lets you document its purpose clearly.
* **You’re hiding implementation details**. Small internal methods can shield the rest of your code from changes.
* **You’re clarifying the public API**. A thin wrapper around a more complex method can make the interface easier to use.

Each of these is about making the interface simpler, not just making the method shorter.

## Don't Fear Long Methods

Long methods are fine if they:

* Coordinate multiple steps
* Keep related logic together
* Document the order of operations

This pattern (where one method orchestrates several helpers) is a form of the [Facade Design Pattern](https://refactoring.guru/design-patterns/facade).

## Don't Split Too Soon

Extracting logic too early can hurt readability. A subtask should be recognizable as a self-contained unit of work. If you need to jump back and forth between the parent and the helper to understand what's happening, you’ve likely split too soon.

![Method Split too soon](/public/method-split.png)

Look for natural boundaries. Wait until a subtask has its own clear role and can be named unambiguously. If you’re struggling to give it a name, it might be too early.

Prefer a longer method that keeps everything in one place over a scattered set of helpers that dilute the logic.

## Public Methods Should Be Deep

Not all methods are equal. Internal helpers can be small and precise. But public methods, the ones others use, should do more. They should hide your design decisions and offer simple, powerful interfaces.

Avoid forcing users to chain together several shallow methods just to get something useful. Instead, give them one method that just works.

## What else could you learn?

This principle is based on Chapter 4 of the [Clean Apex Code](https://a.co/d/gSCaIhO) book. 

The full chapter includes advanced more examples of deep vs shallow modules, and concrete guidelines for when and how to split longer methods into shorter ones.
