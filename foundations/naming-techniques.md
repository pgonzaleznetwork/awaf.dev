# Naming Techniques

Developing on the Salesforce platform involves naming many metadata elements: custom fields, objects, validation rules, flows, Apex classes, methods, and variables. A significant part of understanding what’s going on inside a Salesforce org is deciphering the meaning behind these names.

## Name by Meaning, Not by Type

It’s common to see names like `accountList` or `contactSet`. These describe the collection type, but not what the data represents. A better name is `accounts` or `inactiveContacts`. Whether it’s a `List` or a `Set` is rarely relevant to the business logic.

This also means you can change the data structure later without changing the name. The name stays useful because it was never tied to the implementation.

## Boolean Logic Should Feel Like a Concept

Long boolean expressions buried in `if` statements make code harder to follow.

For example, instead of this

```apex
if ((!String.isBlank(acc.Website) 
&& !String.isBlank(acc.Industry) 
|| acc.IsActive && acc.NumberOfEmployees > 0) 
&& (acc.BillingCountry == 'United States' 
|| acc.BillingCountry == 'Canada' 
|| acc.Custom_Field__c) 
&& acc.LastModifiedDate.daysBetween(System.today()) <= 30) {
    //do something interesting
} 
else {
    //do something less interesting
 }
```

Wrap the expression with a method with a meaningful name:

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

This principle is based on Chapter 2 of the [Clean Apex Code](https://a.co/d/gSCaIhO) book. The full chapter contains many more guidelines, including how to name maps, avoiding magic numbers, and more.
