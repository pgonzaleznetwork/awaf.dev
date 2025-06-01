# Introduction

Welcome to the Apex Well-Architected Framework (AWAF) documentation. This guide will help you understand the core concepts, best practices, and implementation details of building well-architected applications using our framework.

## What is AWAF?

AWAF is a modern framework for building scalable and maintainable Salesforce applications. It provides a set of patterns and practices that help you write clean, testable, and efficient Apex code.

## Why AWAF?

AWAF helps you:
- Write cleaner, more maintainable code
- Implement proper separation of concerns
- Follow Salesforce best practices
- Scale your application effectively

## Quick Start

Here's a simple example of how AWAF helps you structure your code:

```apex{1,4,8}
// Domain class example
public class AccountDomain {
    private List<Account> accounts;
    
    public AccountDomain(List<Account> accounts) {
        this.accounts = accounts;
    }
    
    public void updateIndustry(String industry) {
        for(Account acc : accounts) {
            acc.Industry = industry;
        }
    }
}

// Service layer example
public class AccountService {
    @TestVisible
    private static AccountDomain domain;
    
    public static void updateAccountsIndustry(Set<Id> accountIds, String industry) {
        List<Account> accounts = [SELECT Id, Industry 
                                FROM Account 
                                WHERE Id IN :accountIds];
        
        domain = new AccountDomain(accounts);
        domain.updateIndustry(industry);
        
        update accounts;
    }
}

// Trigger example
trigger AccountTrigger on Account (before update) {
    if (Trigger.isBefore && Trigger.isUpdate) {
        AccountTriggerHandler.handleBeforeUpdate(Trigger.new, Trigger.oldMap);
    }
}
```

## Key Features

### 1. Domain-Driven Design

AWAF encourages a domain-driven approach to your Salesforce development:

```apex{7,9,10}
// Domain class with business logic
public class OpportunityDomain {
    private List<Opportunity> opportunities;
    
    public OpportunityDomain(List<Opportunity> opportunities) {
        this.opportunities = opportunities;
    }
    
    public void calculateAmounts() {
        for(Opportunity opp : opportunities) {
            opp.Amount = opp.Quantity__c * opp.UnitPrice__c;
            opp.TotalAmount__c = opp.Amount * (1 + opp.TaxRate__c);
        }
    }
}
```

### 2. Service Layer Pattern

The service layer provides a clean API for your application:

```apex{3,8,12}
// Service class example
public class OpportunityService {
    @TestVisible
    private static OpportunityDomain domain;
    
    public static void processOpportunities(Set<Id> opportunityIds) {
        List<Opportunity> opportunities = [
            SELECT Id, Amount, Quantity__c, UnitPrice__c, TaxRate__c
            FROM Opportunity
            WHERE Id IN :opportunityIds
        ];
        
        domain = new OpportunityDomain(opportunities);
        domain.calculateAmounts();
        
        update opportunities;
    }
}
```

### 3. Trigger Framework

AWAF provides a simple but powerful trigger framework:

```apex{2,3,4,8,9,10}
// Trigger handler example
public class OpportunityTriggerHandler {
    public static void handleBeforeUpdate(
        List<Opportunity> newList, 
        Map<Id, Opportunity> oldMap
    ) {
        OpportunityDomain domain = new OpportunityDomain(newList);
        domain.validateAmounts(oldMap);
    }
}

// Trigger
trigger OpportunityTrigger on Opportunity (before update) {
    if (Trigger.isBefore && Trigger.isUpdate) {
        OpportunityTriggerHandler.handleBeforeUpdate(
            Trigger.new, 
            Trigger.oldMap
        );
    }
}
```

## Getting Started

To get started with AWAF, you'll need to:

1. Set up your Salesforce development environment
2. Install the AWAF package
3. Configure your project settings

## Next Steps

- Read about the [Foundations](/foundations/overview) to understand the core concepts
- Learn about [Core Concepts](/foundations/core-concepts) to dive deeper
- Explore [Best Practices](/foundations/best-practices) for implementation guidelines 