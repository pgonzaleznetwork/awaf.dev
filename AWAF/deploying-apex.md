## Deploying Apex Code

How you deploy Apex code to other environments is as important as how you write and model your business logic.

The Salesforce DevOps ecosystem is riddled with anti-patterns and unnecessary complexity. We recommend that teams using AWAF deploy Apex code following a simple branching strategy, typically [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

![SFDX Folders](/public/gitflow.png)

This is often a ligther and simplier alternative than [Copado's branching strategy](https://docs.copado.com/articles/#!copado-ci-cd-publication/copado-branching-strategy), which has become popular in recent years. In our experience and that of many others we've spoken to, this branching strategy often creates an explosion of branches that makes managing your Git repo a nightmare. 

To see how to deploy Apex code using Git Flow, see this short demo:

<iframe width="560" height="315" src="https://www.youtube.com/embed/qSRJnEWPoK0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>