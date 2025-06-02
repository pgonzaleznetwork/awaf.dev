## How to model domain classes

In the FFLIB model, domain classes are meant to encapsulate business logic related to a specific object, including methods for trigger events like `beforeInsert()` and `afterUpdate()`. We see the benefit of this approach: having trigger handler methods and other object-related logic in the same class increases cohesion.

However, in our opinion, one domain class per object only works for very small domains. As soon as you have different use cases for the same object, often from multiple business units, the domain class (e.g., `Opportunities`) becomes a “god class.” It becomes a catch-all for all logic related to that object, deviating from the both the Single Responsibility Principle (SRP) and the modularity principles explored in Chapter 10 of the [Clean Apex Code](https://books.google.ie/books/about/Clean_Apex_Code.html?id=4yEc0QEACAAJ&source=kp_book_description&redir_esc=y) book.

“God” classes are also a source of merge conflicts and awkward workarounds. If 2 developers need to make changes to the same class for different reasons, this often leads to merge conflicts later in the CI/CD pipeline. Even worse, sometimes one of those requirements needs to be removed from the release because of failures during UAT, leading to developers commenting out the code or having to recommit changes. All this could be avoided if developers were working on different classes.

To avoid the problems of these monolithic domain classes, we recommend using domain classes that represent a meaningful state of the object, if that state is relevant to the business.

The most common example of a meaningful state is record types, or special status fields like `Opportunity.StageName` or `Case.Status`.

For instance, record types represent subtypes of the main object, similar to subclasses in OOP. Imagine you have opportunities with a Partnerships record type and others with a Customer record type. These subtypes often drive business-specific behavior, such as showing different UIs (via page layouts) or filtering records in flows, triggers, etc.

This leads to code like the following:

```apex
if (oppty.RecordType == 'Partnerships') {
   // Do something
}
```

How many methods in your org are filtering by record type? In a large org, it could be hundreds. This often results in deeply nested if/else statements and methods that do more than one thing.

In AWAF, you create a class that represents the record type of the object and encapsulate all related logic there. For example:

```apex
public class PartnershipOpportunities { ... }

public class CustomerOpportunities { ... }
```

The constructor for these classes can take care of filtering out irrelevant records, like this:

```apex{11-13}
public class PartnershipOpportunities {

    private List<Opportunity> partnerOpptys;

    public PartnershipOpportunities(
          List<Opportunity> opportunities) 
    {
    
        this.partnerOpptys = new List<Opportunity>();
        
        for (Opportunity opp : opportunities) {
            if (opp.RecordType == 'Partnership') {
                this.partnerOpptys.add(opp);
            }
        }
    }

    public void notifyNewOwner() {
        // Do something with partnerOpptys
    }
}
```

In the trigger handler (or other contexts), you simply pass a list of opportunities to the class and execute the relevant logic:

```apex
PartnerOpportunities partnerOpptys = new PartnershipOpportunities(opptys);

partnerOpptys.notifyNewOwner();
```

This approach avoids the need for scattered if/else statements across your codebase and keeps related logic together in one place.

This idea shouldn’t be limited to record types. Any meaningful state can be represented this way.

For example, consider closed cases. The business might have specific logic for handling cases that are closed, like notifying customers or generating reports. Rather than putting all this logic in a generic `Cases` class, you could create a `ClosedCases` class to encapsulate it.

```apex
public class ClosedCases {
   // logic specific to closed cases
}
```

We are not suggesting that every record type or picklist value has a counterpart Apex class. If the state of an object is meaningful, then the state should be represented by a class. That state may be represented with a record type, a custom picklist field, or something else.

When in doubt, remember the [YAGNI principle](https://martinfowler.com/bliki/Yagni.html).
