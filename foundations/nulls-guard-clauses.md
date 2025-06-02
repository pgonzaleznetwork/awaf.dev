# Null and Guard Clauses

Too many null checks in your code can actually hide bugs. If a variable you thought was safe suddenly becomes `null`, that may be a sign of deeper design or data issues. Catching it early with a NullPointerException (NPE) can be a good thing—it gives you a clear signal that something went wrong.

Avoid wrapping every line in `if (x != null)` or overusing the safe navigation operator (`?.`). These patterns often just delay the inevitable failure, making it harder to trace the real problem.

```apex
String providedUsername = user?.username;

// later
if (providedUsername?.contains('example.com')) {
    // this still risks a NPE
}
```

This kind of code avoids an exception for a moment, only to risk it again a few lines later. Instead of constantly checking for null, let the failure happen. Then fix the root cause.

## Guard Clauses Over Nesting

Instead of nesting your logic in defensive `if` statements, exit the method early using guard clauses.

```apex
public void processUser(User user) {
    if (user == null) return;

    String username = user.username;
    // continue processing
}
```

This prevents deeply nested logic and makes your code easier to read. The intent is clear: if the input isn't valid, leave.

Guard clauses can stack:

```apex
if (account == null) return;
if (String.isBlank(account.Industry)) return;
if (account.AnnualRevenue <= 100) return;
if (account.NumberOfEmployees <= 0) return;
```

You can also throw exceptions if exiting silently is not appropriate:

```apex
if (accounts == null) {
    throw new IllegalArgumentException('Accounts list cannot be null');
}
```

## Prefer Empty Over Null

If your method returns a list, return an empty list instead of `null`. This aligns with how SOQL queries behave:

```apex
List<Account> accounts = [SELECT Id FROM Account];
// `accounts` is never null, just possibly empty
```

But for methods returning a single object, returning `null` is often appropriate:

```apex
User foundUser = findUser(username);
if (foundUser != null) {
    // use user
}
```

Throw an exception only when something truly exceptional happens. Not finding a record is usually not.

## Clean Validations

Validate parameters early using guard clauses and extract the validation logic into its own method. This keeps logic at a single level of abstraction:

```apex
public void createUser(String firstName, String lastName, String username) {
    validateParams(firstName, lastName, username);
    // continue
}

private static void validateParams(...) {
    if (String.isBlank(firstName) || String.isBlank(lastName) || String.isBlank(username)) {
        throw new IllegalArgumentException('Missing required user information');
    }
}
```

## Know When to Check

If you create the variable inside the method, and it's not meant to be null, don't check against null. Let it fail if something went wrong.

But if it's passed into your method, validate it immediately:

```apex
public void notifyOwners(List<Account> accounts) {
    if (accounts == null) {
        throw new IllegalArgumentException('Accounts list cannot be null');
    }
    // process list
}
```

This pattern avoids wasted execution and surfaces bad input early.

## What else could you learn?

This principle is based on Chapter 6 of the [Clean Apex Code](https://books.google.ie/books/about/Clean_Apex_Code.html?id=4yEc0QEACAAJ&source=kp_book_description&redir_esc=y) book. 

The full chapter includes deeper discussions around null vs empty, and the performance implications of checking if lists are empty before executing DML statements.
