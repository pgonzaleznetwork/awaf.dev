# Cascading failures in trigger boundaries

When a business requirement spans multiple objects, it can be tempting to implement each part in the respective object’s trigger. Over time, this creates fragile, invisible chains where unrelated triggers invoke each other indirectly. The result is cascading failures that are nearly impossible to diagnose or control.

## A Change in One Record Should Not Implicitly Trigger Other Business Processes

Consider this familiar pattern:

* Updating an Account reassigns its Opportunities
* Reassigning an Opportunity creates a Task
* Creating a Task updates a field on the User

Each of these steps was implemented in a separate trigger, on a separate object, by a different developer. But now, they form a chain. A validation failure at the end of that chain—say, a custom rule on the User—can cause the entire transaction to roll back.

From the system's perspective, all three steps are now part of one atomic operation, even if the business never intended them to be.

## Encapsulate Process Logic in a Single Deep Module

If the three steps are truly part of one business requirement, they should be implemented together in one class. This gives you control over the order of execution, exception handling, and atomicity.

```apex{5-7}
public class AccountOwnership {
    public static void reassignRelatedRecords(Map<Id, Id> ownerIdsByAccountId) {
        Savepoint sp = Database.setSavepoint();
        try {
            reassignOpptys(ownerIdsByAccountId);
            createTasksForNewOwners(ownerIdsByAccountId);
            increaseOpenTaskCount(ownerIdsByAccountId);
        } catch (Exception e) {
            ExceptionLogger.log(e, 'AccountOwnership.reassignRelatedRecords');
            Database.rollback(sp);
        }
    }
}
```

This code communicates the intent clearly: these steps are part of the same process and should succeed or fail together.

## Let the Code Decide Whether to Bubble or Swallow Exceptions

Sometimes, the same method runs as a top-level action (e.g. a user saves a record) and as a downstream effect of another process. These contexts require different exception behaviors:

* At the top level: exceptions should bubble up to the UI.
* Deep in a call stack: exceptions should be logged, not propagated, to avoid cascading failures.

You can make this decision at runtime using a simple trigger stack:

```apex
if (TriggerStack.size() == 1) {
    throw e; // top-level trigger
} else {
    Logger.error(e.getMessage());
    Logger.saveLog(); // deep call stack
}
```

This approach gives your code awareness of its execution context, so it can respond accordingly.

## If a Process Must Be Atomic, Design It That Way

Atomicity should be intentional. Use savepoints and deep modules to control rollback boundaries. Never rely on Apex’s implicit rollback behavior.

If the steps are *not* meant to be atomic, then isolating them across different triggers is acceptable—*but only* if each trigger handles its own exceptions. Otherwise, unrelated processes will still roll back together.

## What else could you learn?

This principle is based on Chapter 7 of the [Clean Apex Code](https://books.google.ie/books/about/Clean_Apex_Code.html?id=4yEc0QEACAAJ&source=kp_book_description&redir_esc=y) book. 

The full chapter includes 3 different techniques for decoupling business process boundaries using queueable apex, platform events and change data capture.
