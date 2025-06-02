# Comments Don’t Lie, Developers Do

Misguided advice has led many developers to treat comments as a code smell. But in Apex, where business logic often responds to opaque platform constraints, comments can be essential if used properly.

## All Code Can Lie

The idea that comments lie stems from the fact that compilers ignore them. If the code changes but the comment doesn’t, it becomes misleading. But so can method names, variable names, and even class structures. Consider this example:

```apex
void deleteOpportunity(Account caseRecord) {
    insert new Contact(LastName = 'FirstName');
}
```

Everything here is a lie, yet there are no comments. A misleading method name or parameter can be just as deceptive. The real issue isn’t comments. It's developers. 

## Comments That Add Value

### 1. "Why" and "Why Not" Comments

Use comments to explain design decisions, especially when they involve trade-offs or platform quirks. This is your best chance to help future readers understand not just what the code does, but why it does it that way.

```apex
// We avoid re-querying already seen dependencies to prevent infinite loops
if (!alreadyQueried) {
    nextLevelIds.add(dep.id);
}
```

These comments capture context that's hard to infer from code alone.

### 2. "Aha!" Comments

When you finally decipher a confusing block of code, leave behind the insight you just gained. Comments like these save time and reduce onboarding pain.

```apex
// Aha! This handles circular references by marking nodes as repeated
```

### 3. Reference Comments

Pointing to external documentation can clarify non-obvious constraints.

```apex
// Salesforce enforces a limit of 10 items: https://developer.salesforce.com/...
final Integer MAX_READMETADATA_LIMIT = 10;
```

### 4. To-do Comments

Useful for temporary workarounds or deferred improvements. They’re better than nothing, especially if no ticketing system is used for minor tasks.

```apex
// TODO: remove this workaround once the bug in field mapping is fixed
```

## Comments to Avoid

### Version Control Comments

Commenting change history in code is a poor substitute for Git. These comments bloat your code and become stale fast.

```apex
/**
 * 2021-07-01 - Added state handling
 */
```

Use version control tools instead. If you're stuck without them, keep these comments lean and temporary.

### ApexDoc When It Adds Nothing

ApexDoc-style comments are helpful in public APIs or open-source libraries. But when they merely restate the method signature, they just add noise.

```apex
/**
 * Inserts an account
 * @param acc The account to insert
 */
```

Skip these unless your audience really needs the extra scaffolding.

### Dead Code Comments

Commented-out blocks of code are dead weight. Delete them. Use Git for recovery, or use feature flags to safely deploy incomplete features.

```apex
// @AuraEnabled
// public static Account getAccount() { ... }
```

If you’re afraid to delete code, the real issue is lack of trust in your tools.

## What else could you learn?

This principle is based on Chapter 5 of the [Clean Apex Code](https://a.co/d/gSCaIhO) book. 

The full chapter includes more examples of good and bad comments.
