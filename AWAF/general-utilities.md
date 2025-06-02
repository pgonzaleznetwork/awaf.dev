## Logging and Observability

[Apex Libra](https://apexlibra.org/apex/) by Piotr Kożuchowski provides general Apex utilities that almost every org will eventually need. For example, the library comes with a lot of built-in methods for dealing with collections

```apex
Map<Id, Opportunity> opportunityByAccountId = (Map<Id, Opportunity>)
    Collection.of(opportunities).mapBy(Opportunity.AccountId);
```

There are also utilities for easily working with picklists in Apex

```apex
Picklist p = new Picklist(Account.Type);

String default = p.getDefaultValue();
String[] values = p.getValues();
SelectOption[] options = p.getSelectOptions();//(VisualForce)
Picklist.Entry[] entries = p.getEntries();//(Aura Enabled)
```

There are many other utilities as well such as mocking, HTTP callouts, etc. 

Finally, Apex Libra also provides general principles and recommendations for structuring Apex code, such as how and where to store constants.
