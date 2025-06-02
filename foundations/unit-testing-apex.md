# Mocking the database for real CI

True continuous integration means running all tests on every commit to a shared branch. But that only works if your test suite is fast enough. In Apex, it usually isn’t.

Slow tests make CI impractical. If every commit takes 40 minutes to validate, you’ll batch changes, skip test runs, or delay feedback. That's not CI. 

## Most Apex tests are integration tests

By default, Apex tests hit the database. That means they’re slow, brittle, and often influenced by triggers, flows, validation rules, and other automation. This makes debugging harder and performance unpredictable.

Even the simplest test often becomes an integration test:

```apex
@IsTest
static void account_created_successfully() {
    String newAccountName = 'Test Account';
    String newPhone = '123-456-7890';

    Test.startTest();
    AccountCreationResult result = new AccountApproval().createAccount(newAccountName, newPhone);
    Test.stopTest();

    Assert.areEqual(true, result.success);
    Account accountFromDB = [SELECT Name FROM Account WHERE Id = :result.account.Id];
    Assert.areEqual('TEST ACCOUNT', accountFromDB.Name);
}
```

This test inserts data, runs all automation, and hits the database again to assert results. That makes it slow and fragile.

## Unit tests don't need the database

If you isolate the logic from the database, you can run much faster tests. Here's a simplified (and trivial, not production-ready) example that skips DML operations:

```apex
if (!Test.isRunningTest()) {
    Database.insert(result.account);
} else {
    result.account.Id = FakeId.getFrom(Account.SObjectType);
}
```

Now the test can assert against `result.account.Name` directly, skipping the insert and SOQL query. This drops test time from 3.5 seconds to 60 milliseconds. The logic is tested in memory, without involving external dependencies.

## Many ways to skip the database

There are **many ways** to isolate your logic from the database. The chapter in the book covers **wrappers, dependency injection, the Stub API, and mocking libraries**. These enable fast tests without polluting your business logic.

But they come with trade-offs. They add complexity, and they test behaviour in isolation from flows, validation rules, and other org-level automation. Integration tests are still needed to validate end-to-end behaviour.

## What else could you learn?

This principle is based on Chapter 12 of the [Clean Apex Code](https://books.google.ie/books/about/Clean_Apex_Code.html?id=4yEc0QEACAAJ&source=kp_book_description&redir_esc=y) book. 

In the book, you'll learn how to build both kinds of tests and combine them in a way that supports real CI. You'll also see how to stub SOQL queries, create DML mocks and more. If you've ever felt like testing in Apex is harder than it should be, this is the chapter you’ve been waiting for.
