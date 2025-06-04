## Selector Classes

A big part of FFLIB is the selector classes, which are used to encapsulate all SOQL queries. As explained earlier, these classes quickly become [shallow modules](/foundations/method-size-structure.md#shallow-vs-deep-modules)

However, one advantage of selector classes is that because the query is wrapped with a class, you can mock that class during tests. This can be orders of magnitude easier than inserting dozens of records and trying to pass all validation rules in a test class.

As an alternative to FFLIB selectors, we recommend [SOQL Lib](https://soql.beyondthecloud.dev/docs/basic-features) by Piotr Gajek. 

```apex{4}
Account account = (Account) SOQL.of(Account.SObjectType)
        .with(Account.Id, Account.OwnerId)
        .whereAre(SOQL.Filter.with(Account.Id).equal(accountId))
        .mockId('transferAccountOwnership.queryAccount')
        .toObject();
```

The library  has good community support and most importantly, **provides one of the quickest and simplest way of mocking queries**.

Finally, unlike object-specific selectors, SOQL Lib is a general-purpose module. As we’ve explored earlier, general-purpose modules are inherently deeper and provide more value across the codebase.

