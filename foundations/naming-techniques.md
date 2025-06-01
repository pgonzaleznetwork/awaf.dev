# Naming Techniques

In Salesforce development, names are everywhere—objects, fields, classes, methods, variables. When the names are clear, the code is clear. When the names are vague, everything feels harder than it should. This chapter is about how small changes to your naming habits can make a big difference.

## Name by Meaning, Not by Type

It’s common to see names like `accountList` or `contactSet`. These describe the collection type, but not what the data represents. A better name is `accounts` or `inactiveContacts`. Whether it’s a `List` or a `Set` is rarely relevant to the business logic.

This also means you can change the data structure later without changing the name. The name stays useful because it was never tied to the implementation.

## Boolean Logic Should Feel Like a Concept

Long boolean expressions buried in `if` statements make code harder to follow. Instead, wrap them in a method with a meaningful name:

```apex
if (isEligibleForSync(account)) {
    // do something
}
```

Inside that method, break the logic into smaller parts like `hasRequiredFields`, `isNorthAmerica`, and `meetsActivityCriteria`. This way, your code reads more like a sentence than a puzzle.

## Show How Similar Things Are Different

If you’re comparing two `Opportunity` records in a method, avoid names like `o1` and `o2`. Use `oldOppty` and `newOppty`, or `childOppty` and `parentOppty`. This makes the relationship between the two values explicit.

Good naming is not just about description. It’s also about distinction.

## Update Names When Requirements Change

If a variable is called `allContacts`, but now only includes contacts from the past 7 days, the name no longer reflects reality. Change it. Use `recentlyCreatedContacts` or something more accurate.

Outdated names are just as harmful as unclear ones. Don’t let your code tell yesterday’s story.

## What else could you learn

This theme is based on Chapter 2 of the [Clean Apex Code](https://books.google.ie/books/about/Clean_Apex_Code.html?id=4yEc0QEACAAJ&source=kp_book_description&redir_esc=y) book. The full chapter dives into map naming debates, boolean phrasing patterns, the dangers of magic numbers, how to name things when the context is unclear, and why obsessing over names can sometimes point to deeper design flaws.
