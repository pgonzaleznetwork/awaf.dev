# Doing one thing

Common wisdom suggests that clean methods have two traits: they do one thing and they are short. However, these characteristics are merely the end result of various design principles. Applying these ideas without understanding the underlying principles won't help you learn how to properly think about methods.

## Avoid mixing abstraction levels

Here's an example of a `createUser()` method that does too much at once:

```apex{14-19}
public static User createUser(String firstName, String lastName, String username){

    validateParams(firstName, lastName, username);

    List<User> existingUsers = [SELECT Id FROM User WHERE Username = :username];

    if (!existingUsers.isEmpty()) {
        throw new PortalException('User already exists: ' + username);
    }
    else {
        User newUser = setUserDefaults(firstName, lastName, username);
        insert newUser;       

        String chars = '12345abcdefghijklmnopqrstuvwxyz';
        String password = '';
        while (password.length() < 8) {
            Integer i = Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
            password += chars.substring(i, i+1);
        }

        System.setPassword(newUser.Id,password);

        return newUser;
    }
}
```

This method mixes levels of abstraction. It manages high-level tasks like checking if the user exists, and low-level concerns like generating a random password. This makes it harder to read, reuse, and test.

Now compare that to this cleaner version:

```apex{9}
validateParams(firstName, lastName, username);

List<User> existingUsers = [SELECT Id FROM User WHERE Username = :username];
if (!existingUsers.isEmpty()) {
    throw new PortalException('User already exists: ' + username);
} else {
    User newUser = setUserDefaults(firstName, lastName, username);
    insert newUser;
    System.setPassword(newUser.Id, Password.generatePassword());
    return newUser;
}
```

Each statement now fits the mental model of "creating a user." None of them dive into implementation details. **Those details live elsewhere**.

## Methods can do many things at one level of abstraction

"Do one thing" is a good principle, but it's not a rule. Clean methods may perform several operations, as long as those operations exist at the same level of abstraction.

Abstraction level mismatches are a leading cause of tangled code. Keep each method focused on one layer.

## Boolean parameters: one abstraction or two?

Boolean parameters often signal a method doing two different things. Consider:

```apex
Database.insert(newAccounts, false); // allow partial success
Database.insert(newAccounts, true);  // all-or-none
```

This is acceptable if:

* The boolean enhances the method's primary behavior
* It operates at the same abstraction level
* There's only one boolean

But if a method takes two or more booleans, especially when they're unrelated, you’re likely mixing concerns. This can confuse readers and increase coupling. For instance:

```apex
Database.insert(newAccounts, false, AccessLevel.USER_MODE);
```

Not clear. Better alternatives include named methods (`insertPartial()`) or fluent interfaces, like this

```apex
DML dmlOperation = new DML()
		.setOperation(DML.Operation.INSERTS)
		.setRecords(accounts)
		.setAllowPartialSuccess(false);

dmlOperation.execute();
```

::: tip
How to build this fluent interface is explored in detail in Chapter 3 of the [Clean Apex Code](https://books.google.ie/books/about/Clean_Apex_Code.html?id=4yEc0QEACAAJ&source=kp_book_description&redir_esc=y) book.
:::

## Use a simple checklist

Instead of counting how many things a method does, ask these three questions:

1. Is this logic at a different level of abstraction?
2. Should this logic be reusable?
3. Can I easily test this logic in isolation?

If any answer is yes, consider extracting a new method or class.

## Don’t be dogmatic

You’ll often need methods that do many things to accomplish a single goal. That’s fine, just keep the abstraction level consistent.

## What else could you learn?

This principle is based on Chapter 3 of the [Clean Apex Code](https://books.google.ie/books/about/Clean_Apex_Code.html?id=4yEc0QEACAAJ&source=kp_book_description&redir_esc=y) book. 

The full chapter includes advanced examples of using polymorphism, the strategy design pattern and fluent interfaces to simplify complex operations that need to "do many things".
