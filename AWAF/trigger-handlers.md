## Filtering logic in trigger handlers

In the previous section, we mentioned that trigger handlers should only contain minimal business logic and route records to the correct class. However, because triggers are so central to Salesforce development, we want to expand on this a bit more and give clear guidance.

A question many developers have had is where should you place filtering logic. Consider this example in the `OpportunityTriggerHandler` class:

```apex{10-14}
//oldOpptys is trigger.old
//newOpptys is trigger.new

List<Opportunity> closedOpptys = new List<Opportunity>();
        
for(Opportunity newOppty : newOpptys.values()){

    Opportunity oldOppty = oldOpptys.get(newOppty.Id);
  
    //filtering logic
    if(
      newOppty.StageName == 'Closed Won' && 
      oldOppty.StageName != 'Closed Won')
    {
        closedOpptys.add(newOppty);
    }
}

if(!closedOpptys.isEmpty()){
    //call the "functional core" class
    new ClosedOpportunities().createContracts(closedOpptys);
}
```

Where should this logic be? Should it be inside the trigger handler class? Also, is this considered business logic?

In our opinion, this is business logic because if you were to create a contract for every opportunity that was updated, regardless of whether the stage changed to Closed Won, the business will surely complain. However, this is business logic that is inevitably tied to the infrastructure: we must compare `trigger.new` against `trigger.old` to determine if we should proceed. That’s why we said in the previous section that it is acceptable for trigger handlers to contain minimal business logic.

Now, let us expand on that statement: **Trigger handlers can contain business logic if that logic relates to filtering the records that must be processed by a “functional core” class.**

One problem with this recommendation is that it assumes the functional core can really work without knowing anything about its environment. Suppose that to check if a Contract must be created, we also must check if the Opportunity has line items with an approved status. If we do the subquery inside the trigger handler, we are implicitly saying that the `ClosedOpportunities` class will expect a list of opportunities and their line items. What if we forget to run the subquery? What if other contexts pass the opportunities without the line items?

> [!TIP]
> This is the same concern that FFLIB tries to solve by using Selector classes to standarise the "shape" of SObjects as discussed [here](/AWAF/fflib-recap.html#selectors-are-shallow-modules). We agree this is a problem, we simply don't agree with the solution. Read below to see how we recommend you solve this problem.

What we are seeing here is that there’s coupling between the filtering logic and the pure business logic, but that coupling has a long distance. Some part of the business process is in the trigger handler, while other parts are in the “functional core” class. That distance is the opposite of cohesion. If modules are inevitably coupled, then we must shorten that distance between them and make the coupling more obvious: that is cohesion.

To achieve this, we could add a method on `ClosedOpportunities` that is responsible for filtering opportunities that meet the precondition, for example:

```apex
//inside of ClosedOpportunities.cls
public static List<Opportunity> getClosedWonOpportunities(
        Map<Id, Opportunity> newOpptys, 
        Map<Id, Opportunity> oldOpptys)
    {

        List<Opportunity> closedOpptys = new List<Opportunity>();

        for(Opportunity newOppty : newOpptys.values()){

            Opportunity oldOppty = oldOpptys.get(newOppty.Id);

            if(
              newOppty.StageName == 'Closed Won' && 
              oldOppty.StageName != 'Closed Won')
            {
                closedOpptys.add(newOppty);
            }
        }

        return closedOpptys;
     }
```

This method simply returns a list of closed opportunities based on the values of `trigger.newMap` and `trigger.oldMap` (without referencing the trigger context directly). With this, we could have the following code in the trigger handler:

```apex{1,5}
//Use ClosedOpportunities to filter out related records
List<Opportunity> closedOpptys = ClosedOpportunities.getClosedWonOpportunities(newOpptys, oldOpptys);

if(!closedOpptys.isEmpty()){
    //Then call ClosedOpportunities again to act on those records
    new ClosedOpportunities().createContracts(closedOpptys);
}
```

This way, the dependency between the state of the opportunities and the `createContracts` method becomes obvious.

That said, we are not suggesting you do this with every scenario. The official AWAF guidance is: **filtering logic should reside in trigger handlers.** If lack of cohesion becomes a problem, consider moving that logic to the same “functional core” class that the trigger routes the records to.
